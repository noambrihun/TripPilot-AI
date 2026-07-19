import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import tripRoutes from "./routes/tripRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "TripPilot AI backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});