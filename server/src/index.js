import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
const app = express();
const allowedOrigins = new Set(
  (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const isLocalVite = /^http:\/\/localhost:51\d{2}$/.test(origin);
      if (allowedOrigins.has(origin) || isLocalVite) return callback(null, true);
      return callback(new Error("CORS blocked origin"));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.get("/api/health", (_, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: "Server error" }); });
const port = process.env.PORT || 5000;
await connectDb(process.env.MONGODB_URI);
app.listen(port, () => console.log(`Server running on ${port}`));
