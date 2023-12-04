import { Router } from "express";
import {
	getAuthorQuotes,
	getQuotes,
	getRandomQuote,
} from "../controllers/quoteController";

const router = Router();

router
	.get("/", getQuotes)
	.get("/random", getRandomQuote)
	.get("/:author", getAuthorQuotes);

export default router;
