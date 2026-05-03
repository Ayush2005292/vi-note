import { Router } from "express";
import { createSession, deleteSession, getSession, listSessions, listTags, updateSession } from "../controllers/sessionController.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
router.use(requireAuth); router.get("/tags", listTags); router.get("/", listSessions); router.post("/", createSession); router.get("/:id", getSession); router.put("/:id", updateSession); router.delete("/:id", deleteSession);
export default router;
