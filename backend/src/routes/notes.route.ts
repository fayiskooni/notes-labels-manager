import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notes.controller";

const router = Router();

router.post("/note", createNote);
router.get("/notes", getNotes);
router.get("/note/:id", getNote);
router.delete("/note/:id", deleteNote);
router.patch("/note/:id", updateNote);

export default router;
