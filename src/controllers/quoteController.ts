import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createCustomError } from "../errors/customError";

const prisma = new PrismaClient();

type quote = {
	text: string;
	author: string;
	genre: string;
};

type RandomQuoteResponse = quote;
type QuotesResponse = {
	data: {
		quotes: quote[];
	};
	pagination: {
		total: number;
		limit: number;
		offset: number;
	};
};

export const getQuotes = async (
	req: Request,
	res: Response<QuotesResponse>,
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
		select: {
			text: true,
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

	if (quotes.length === 0) {
		return next(
			createCustomError(
				`Could not find quotes with limit: ${limit} and offset: ${offset}`,
				404
			)
		);
	}

	const quotesArr: quote[] = quotes.map((quote): quote => {
		return {
			text: quote.text,
			author: quote.author.name,
			genre: quote.genre.name,
		};
	});

	const totalQuotes = await prisma.quote.count();
	res.json({
		pagination: { total: totalQuotes, limit, offset },
		data: { quotes: quotesArr },
	});
};

export const getRandomQuote = async (
	req: Request,
	res: Response<RandomQuoteResponse>
) => {
	const totalQuotes = await prisma.quote.count();
	const random = Math.floor(Math.random() * totalQuotes);

	const quote = await prisma.quote.findUnique({
		where: { id: random },
		select: {
			text: true,
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
		text: quote?.text || "Unknown",
		author: quote?.author?.name || "Unknown",
		genre: quote?.genre?.name || "Unknown",
	});
};

export const getAuthorQuotes = async (
	req: Request,
	response: Response,
	next: Function
) => {
	let limit = Number(req.query.limit) || 20;
	if (limit > 20) {
		limit = 20;
	}
	const offset = Number(req.query.offset) || 0;

	const { author } = req.params;
	const totalQuotesByAuthor = await prisma.quote.count({
		where: { author: { name: req.params.author } },
	});
	const authorQuotes = await prisma.quote.findMany({
		where: { author: { name: author } },
		skip: offset,
		take: limit,
		select: {
			text: true,
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

	if (authorQuotes.length === 0) {
		return next(
			createCustomError(`Could not find quotes with author: ${author}`, 404)
		);
	}

	// re-organize the output
	const retVal = authorQuotes.map((quote) => {
		return {
			text: quote.text,
			author: quote.author.name,
			genre: quote.genre.name,
		};
	});

	return response.json({
		pagination: {
			total: totalQuotesByAuthor,
			limit,
			offset,
		},
		data: { quotes: retVal },
	});
};
