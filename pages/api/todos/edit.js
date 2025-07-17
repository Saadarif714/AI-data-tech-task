import pool from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).json({ error: "Only PUT allowed" });

  const { id, title, completed } = req.body;

  if (!id) return res.status(400).json({ error: "Missing task ID" });

  try {
    const connection = await pool.getConnection();
    await connection.query("UPDATE todos SET completed = ? WHERE id = ?", [completed, id]);
    connection.release();
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
}
