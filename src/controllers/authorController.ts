import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createCustomError } from "../errors/customError";

const prisma = new PrismaClient();

export const getAuthors = async (
	req: Request,
	res: Response,
	next: Function
) => {
	let limit = Number(req.query.limit) || 10;
	if (limit > 10) {
		limit = 10;
	}
	const offset = Number(req.query.offset) || 0;

	const authors = await prisma.author.findMany({
		skip: offset,
		take: limit,
	});
	const totalAuthors = await prisma.author.count();

	if (authors.length === 0) {
		return next(
			createCustomError(
				`Could not find authors with limit: ${limit} and offset: ${offset}`,
				404
			)
		);
	}

	res.json({
		data: { authors },
		pagination: { total: totalAuthors, limit, offset },
	});
};

export const getAuthorById = async (
	req: Request,
	res: Response,
	next: Function
) => {
	const { id } = req.params;
	if (!id) {
		return next(createCustomError(`Please provide id`, 400));
	}
	const author = await prisma.author.findUnique({
		where: { id: Number(id) },
	});

	if (!author) {
		return next(createCustomError(`Could not find author with id: ${id}`, 404));
	}

	res.json({ data: { author } });
};
