import { Router } from "express";
import { getAllGenres } from "../controllers/genreController";

const router = Router();

router.get("/", getAllGenres);

export default router;
