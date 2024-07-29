import express from "express";
import authRoute from "./authRoute.js";
import projectRoute from "./projectRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/projects", projectRoute);

export default router;