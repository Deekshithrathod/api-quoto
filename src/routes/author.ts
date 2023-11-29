import { Router } from "express";
import { getAuthors } from "../controllers/authorController";

const router = Router();

router.get("/", getAuthors);

export default router;
