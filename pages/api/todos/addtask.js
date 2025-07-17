import pool from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { title, user_id } = req.body;

  if (!title || !user_id) return res.status(400).json({ error: "Missing data" });

  try {
    const connection = await pool.getConnection();
    await connection.query("INSERT INTO todos (title, user_id) VALUES (?, ?)", [title, user_id]);
    connection.release();
    res.status(201).json({ message: "Todo added" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
