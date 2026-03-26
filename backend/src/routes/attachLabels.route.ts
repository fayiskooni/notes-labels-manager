import { Router } from "express";
import { attachLabelToNote, getNotesByLabel, removeLabelFromNote } from "../controllers/attachLabels.controller";

const router = Router();

router.post("/note/:noteId/label", attachLabelToNote);
router.delete("/note/:noteId/label", removeLabelFromNote);
router.get("/notes/filter", getNotesByLabel);

export default router;
