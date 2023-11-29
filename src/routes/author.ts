import { Router } from "express";
import { getAuthorById, getAuthors } from "../controllers/authorController";

const router = Router();

router.get("/", getAuthors).get("/:id", getAuthorById);

export default router;
