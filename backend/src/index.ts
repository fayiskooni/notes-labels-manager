import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";

import notesRoutes from "./routes/notes.route";
import labelsRoutes from "./routes/labels.route";
import attachLabelsRoutes from "./routes/attachLabels.route";

const app = express();

connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/", notesRoutes);
app.use("/", labelsRoutes);
app.use("/", attachLabelsRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
