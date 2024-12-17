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
  console.log(email, password)
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

app.post('/api/logout', (req, res) => {
  console.log( `-> /api/logout` )
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'strict', 
    secure: false,
  });
  res.status(200).json({ message: "Logged out successfully" });
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

app.post('/api/posts', async(req, res) => {
  try {
      console.log("a post request has arrived");
      const post = req.body;
      const newpost = await pool.query(
          "INSERT INTO posts(body) values ($1)    RETURNING*", [post.body]
// $1, $2, $3 are mapped to the first, second and third element of the passed array (post.title, post.body, post.urllink) 
// The RETURNING keyword in PostgreSQL allows returning a value from the insert or update statement.
// using "*" after the RETURNING keyword in PostgreSQL, will return everything
      );
      res.status(201).json(newpost.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/api/posts", async (req, res) => {
  try{
    console.log("Fetching all posts");
    const posts = await pool.query(
      "SELECT * FROM posts ORDER BY 3 desc"
  );
    console.log(posts)
    res.status(200).json({"posts": posts.rows});
  }catch(err){
    console.error(err)
    res.status(404).json({error: "Couldn't fetch posts from db"})
  }
})

app.delete('/api/posts', async(req, res) => {
  try {
    console.log("Delete all posts request has arrived");
    const deleteAll = await pool.query("DELETE FROM posts");
    res.status(200).json({message: "All posts deleted successfully"});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: "Failed to delete all posts"});
  }
});


app.get("/api/post", async (req, res) => {
  try{
    const queryParams = new URLSearchParams( req.query );

    const id = queryParams.get( 'id' );

    if ( !id ) {
      res.status( 400 ).json({ error: "Not Found." });
      return;
    }

    const db_res = await pool.query( "SELECT * FROM posts where id = $1", [ id ] );

    const post = db_res.rows[ 0 ];

    if ( !post ) {
      res.status( 400 ).json({ error: "Couldn't find post." });
      return;
    }

    res.status(200).json({ "post": post });
  }catch(err){
    console.error(err)
    res.status(404).json({error: "Couldn't find post."})
  }
})

app.patch('/api/post', async (req, res) => {
  try {
    console.log(`a post udpdate request has arrived`);
    console.log( req.body )

    const post = req.body;
    await pool.query(
        "update posts set body = $2 where id = $1", [post.id, post.body]
    );
    res.status(202);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error : "Couldn't update post." })
  }
} );

app.delete('/api/post', async (req, res) => {
  try {
    console.log(`a post deletion request has arrived`);
    console.log( req.body )

    const body = req.body;
    await pool.query(
        "delete from posts where id = $1", [body.id]
    );
    res.status(200).json( { status : "ok" } );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error : "Couldn't delete post." })
  }
} );

// test endpoint to check server
app.get('/api/test', (req, res) => {
  res.json({ message: 'backend is running!' });
});

app.get('/api/check_jwt', ( req, res ) => {
  if ( req.cookies[ 'jwt' ] )
    res.status( 200 ).json({ message: 'authed' });
  else
    res.status( 401 ).json({ error: "invalid token" });
})

app.listen(port, () => {
  console.log("server is listening on port " + port);
});