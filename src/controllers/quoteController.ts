import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createCustomError } from "../errors/customError";

const prisma = new PrismaClient();

export const getQuotes = async (
	req: Request,
	res: Response,
	next: Function
) => {
	let limit = Number(req.query.limit) || 10;
	if (limit > 10) {
		limit = 10;
	}
	const offset = Number(req.query.offset) || 0;

	const quotes = await prisma.quote.findMany({
		skip: offset,
		take: limit,
	});
	if (quotes.length === 0) {
		return next(
			createCustomError(
				`Could not find quotes with limit: ${limit} and offset: ${offset}`,
				404
			)
		);
	}

	const totalQuotes = await prisma.quote.count();
	res.json({
		data: { quotes },
		pagination: { total: totalQuotes, limit, offset },
	});
};

export const getRandomQuote = async (req: Request, res: Response) => {
	const totalQuotes = await prisma.quote.count();
	const random = Math.floor(Math.random() * totalQuotes);

	const quote = await prisma.quote.findUnique({
		where: { id: random },
		include: {
			author: {
				select: {
					name: true,
				},
			},
			genre: {
				select: {
					name: true,
				},
			},
		},
	});

	res.json({
		data: {
			quote: quote?.text,
			author: quote?.author?.name,
			genre: quote?.genre?.name,
		},
	});
};
