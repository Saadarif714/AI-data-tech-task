import pool from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).json({ error: "Only DELETE allowed" });

  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Missing task ID" });

  try {
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM todos WHERE id = ?", [id]);
    connection.release();
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
}
