import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  const email  = req.query.email;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE useremail = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ id: rows[0].id, email: rows[0].useremail,name: rows[0].name});
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
}
