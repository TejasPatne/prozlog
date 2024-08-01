import express from "express";
import { getUser, update } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/update/:id", authMiddleware, update);

export default router;