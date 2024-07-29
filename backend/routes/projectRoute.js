import express from "express";
import { create, getAllProjects, getProject, remove, update } from "../controllers/projectController.js";

const router = express.Router();

router.post("/new", create);
router.route("/:id").delete(remove).post(update).get(getProject);
router.route("/:id?").get(getAllProjects);

export default router;