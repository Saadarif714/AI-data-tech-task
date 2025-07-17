import pool from "../../../lib/db";

export default async function handler(req, res) {
  const { user_id } = req.query;

  if (!user_id) return res.status(400).json({ error: "Missing user_id" });

  try {
    const connection = await pool.getConnection();
    const [todos] = await connection.query("SELECT * FROM todos WHERE user_id = ?", [user_id]);
    connection.release();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}
