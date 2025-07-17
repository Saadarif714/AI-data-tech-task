import pool from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handleLogin(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { useremail, userpassword } = req.body;

  if (!useremail || !userpassword) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const connection = await pool.getConnection();

  try {
    const [users] = await connection.query(
      'SELECT * FROM users WHERE useremail = ?',
      [useremail]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(userpassword, user.userpassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    connection.release();
  }
}
