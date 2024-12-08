const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const pool = require('./database');

const port = process.env.PORT || 3000;

const app = express();

// allow requests from vue frontend at localhost:8080 and include cookies
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

// parse json bodies
app.use(express.json());

// parse cookies
app.use(cookieParser());

// create tables if they don't exist (users and posts)
const createTables = async () => {
  try {
    // create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    // create posts table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        body TEXT NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log("tables are ready");
  } catch (err) {
    console.error(err);
  }
};

createTables();

const JWT_SECRET = "YOUR_JWT_SECRET_KEY_HERE"; 
// should go in env file maybe

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required." });
  }

  try {
    // check if user already exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "user already exists." });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 
    // 10 is the salt rounds

    // insert the new user
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    const user = newUser.rows[0]; 
    // generate a jwt
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // send jwt as http-only cookie
    res
      .cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false // set to true if using https
      })
      .json({ message: "user created successfully", user: { email: user.email }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required." });
  }

  try {
    // check if user exists
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: "invalid email or password." });
    }

    const user = userQuery.rows[0];

    // compare submitted password with stored password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "invalid email or password." });
    }

    // password matches, create jwt
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // send jwt as http-only cookie
    res
      .cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false // set to true if using https
      })
      .json({ message: "login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// test endpoint to check server
app.get('/api/test', (req, res) => {
  res.json({ message: 'backend is running!' });
});

app.listen(port, () => {
  console.log("server is listening on port " + port);
});
