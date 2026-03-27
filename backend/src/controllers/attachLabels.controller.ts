import { Request, Response } from "express";
import { pool } from "../db";

export async function attachLabelToNote(req: Request, res: Response) {
  const { noteId } = req.params;
  const { labelIds } = req.body;

  const parsedNoteId = parseInt(noteId as string, 10);

  if (isNaN(parsedNoteId) || !Array.isArray(labelIds)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const noteCheck = await pool.query("SELECT id FROM notes WHERE id = $1", [
      parsedNoteId,
    ]);

    if (noteCheck.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    const attachedLabels = [];

    for (const labelId of labelIds) {
      const parsedLabelId = parseInt(labelId, 10);

      if (isNaN(parsedLabelId)) continue;

      const labelCheck = await pool.query(
        "SELECT id FROM labels WHERE id = $1",
        [parsedLabelId],
      );

      if (labelCheck.rows.length === 0) continue;

      try {
        const result = await pool.query(
          `
          INSERT INTO note_labels (note_id, label_id)
          VALUES ($1, $2)
          RETURNING *
          `,
          [parsedNoteId, parsedLabelId],
        );

        attachedLabels.push(result.rows[0]);
      } catch (error: any) {
        // duplicate → ignore
        if (error.code === "23505") continue;

        throw error;
      }
    }

    res.status(200).json({
      success: true,
      data: attachedLabels,
    });
  } catch (error) {
    console.error("Error attaching labels:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeLabelFromNote(req: Request, res: Response) {
  const { noteId } = req.params;
  const { labelId } = req.body;

  const parsedNoteId = parseInt(noteId as string, 10);
  const parsedLabelId = parseInt(labelId, 10);

  if (isNaN(parsedNoteId) || isNaN(parsedLabelId)) {
    return res.status(400).json({ message: "Invalid IDs" });
  }

  try {
    const noteCheck = await pool.query("SELECT id FROM notes WHERE id = $1", [
      parsedNoteId,
    ]);

    if (noteCheck.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    const labelCheck = await pool.query("SELECT id FROM labels WHERE id = $1", [
      parsedLabelId,
    ]);

    if (labelCheck.rows.length === 0) {
      return res.status(404).json({ message: "Label not found" });
    }

    const result = await pool.query(
      `
      DELETE FROM note_labels
      WHERE note_id = $1 AND label_id = $2
      RETURNING *
      `,
      [parsedNoteId, parsedLabelId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Label not attached to this note",
      });
    }

    res.status(200).json({
      success: true,
      message: "Label removed from note",
    });
  } catch (error: any) {
    console.error("Error removing label:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNotesByLabel(req: Request, res: Response) {
  const { labelIds } = req.query;

  if (!labelIds) {
    return res.status(400).json({
      message: "labelIds query parameter is required",
    });
  }

  // "1,2" → [1, 2]
  const idArray = (labelIds as string)
    .split(",")
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !isNaN(id));

  if (idArray.length === 0) {
    return res.status(400).json({
      message: "Invalid label IDs",
    });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        n.id,
        n.title,
        n.content,
        n.created_at,
        COALESCE(
          ARRAY_AGG(DISTINCT l.name) FILTER (WHERE l.id IS NOT NULL),
          '{}'
        ) AS labels
      FROM notes n
      JOIN note_labels nl ON n.id = nl.note_id
      JOIN labels l ON nl.label_id = l.id
      WHERE l.id = ANY($1)
      GROUP BY n.id
      ORDER BY n.created_at DESC
      `,
      [idArray],
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error filtering notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
