import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,          
  password: process.env.PASSWORD,  
  database: process.env.DB,   
  port: process.env.PORT
  
});

export default pool;

