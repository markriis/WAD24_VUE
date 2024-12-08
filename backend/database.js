// could use env variables for the database connection, so it's not hardcoded idk
const { Pool } = require('pg');
const pool = new Pool({
  user: "postgres",       
  password: "parool", 
  database: "hw4db",      
  host: "localhost",
  port: "5432"
});

module.exports = pool;
