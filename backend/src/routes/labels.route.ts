import { Router } from "express";
import {
  createLabel,
  deleteLabel,
  getLabels,
  updateLabel,
} from "../controllers/labels.controller";

const router = Router();

router.post("/label", createLabel);
router.get("/labels", getLabels);
router.delete("/label/:id", deleteLabel);
router.patch("/label/:id", updateLabel);

export default router;
