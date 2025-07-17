import pool from '../../../lib/db'; 
import bcrypt from 'bcryptjs';

export default async function handleSignUp(req, res) {
  const connection = await pool.getConnection();

  try {
    if (req.method === 'POST') {
      const { username, useremail, userpassword } = req.body;

      if (!username || !useremail || !userpassword) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if email already exists
      const [existing] = await connection.query(
        'SELECT * FROM users WHERE useremail = ?',
        [useremail]
      );
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(userpassword, 10);

      const [result] = await connection.query(
        'INSERT INTO users (username, useremail, userpassword) VALUES (?, ?, ?)',
        [username, useremail, hashedPassword]
      );

      res.status(201).json({ message: 'User created', Id: result.insertId });
    } else {
      res.status(405).json({ error: 'Only POST method is allowed' });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }
}
