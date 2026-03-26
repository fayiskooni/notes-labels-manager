import { Router } from "express";
import { createNote, deleteNote, getNote, getNotes } from "../controllers/notes.controller";

const router = Router();

router.post("/note", createNote);
router.get("/notes", getNotes);
router.get("/note/:id", getNote);
router.delete("/note/:id", deleteNote);

export default router;
