import { Router } from "express";
import { createLabel } from "../controllers/labels.controller";

const router = Router();

router.post("/label", createLabel);

export default router;
