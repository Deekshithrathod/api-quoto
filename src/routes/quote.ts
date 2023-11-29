import { Router } from "express";
import { getQuotes, getRandomQuote } from "../controllers/quoteController";

const router = Router();

router.get("/", getQuotes).get("/random", getRandomQuote);

export default router;
