import { Request, Response } from "express";
import { pool } from "../db";

export async function createNote(req: Request, res: Response) {
  const { title, content } = req.body;

  try {
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "title and content are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content],
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNotes(req: Request, res: Response) {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC",
    );

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error in Fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNote(req: Request, res: Response) {
  const { id } = req.params;
  const noteId = parseInt(id as string, 10);

  if (isNaN(noteId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [
      noteId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in fetching note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req: Request, res: Response) {
  const { id } = req.params;
  const noteId = parseInt(id as string, 10);

  if (isNaN(noteId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [noteId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req: Request, res: Response) {
  const { id } = req.params;
  const noteId = parseInt(id as string, 10);

  const { title, content } = req.body;

  if (isNaN(noteId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const result = await pool.query(
      `
      UPDATE notes
      SET 
        title = COALESCE($1, title),
        content = COALESCE($2, content)
      WHERE id = $3
      RETURNING *
      `,
      [title, content, noteId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}