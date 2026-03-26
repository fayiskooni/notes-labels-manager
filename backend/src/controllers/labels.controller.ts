import { Request, Response } from "express";
import { pool } from "../db";

export async function createLabel(req: Request, res: Response) {
  const { name } = req.body;
  if (!name?.trim()) {
    return res.status(400).json({
      message: "Label name is required",
    });
  }
  const formattedName = name.trim().toLowerCase();

  try {
    const result = await pool.query(
      "INSERT INTO labels (name) VALUES ($1) RETURNING *",
      [formattedName],
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Label already exists",
      });
    }

    console.error("Error creating label:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getLabels(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM labels");

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error in Fetching labels:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteLabel(req: Request, res: Response) {
  const { id } = req.params;
  const labelId = parseInt(id as string, 10);

  if (isNaN(labelId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM labels WHERE id = $1 RETURNING *",
      [labelId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Label not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Label deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting label:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateLabel(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;

  const labelId = parseInt(id as string, 10);

  if (isNaN(labelId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const formattedName = name?.trim().toLowerCase();

  try {
    const result = await pool.query(
      `
      UPDATE labels
      SET 
        name = COALESCE($1, name)
      WHERE id = $2
      RETURNING *
      `,
      [formattedName, labelId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Label not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Label already exists",
      });
    }

    console.error("Error updating label:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
