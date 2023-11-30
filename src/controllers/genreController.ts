import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createCustomError } from "../errors/customError";

const prisma = new PrismaClient();

export const getAllGenres = async (
	req: Request,
	res: Response,
	next: Function
) => {
	let limit = Number(req.query.limit) || 100;
	if (limit > 100) {
		limit = 100;
	}

	const offset = Number(req.query.offset) || 0;
	const totalGenres = await prisma.genre.count();

	const genres = await prisma.genre.findMany({
		skip: offset,
		take: limit,
		select: {
			name: true,
		},
	});
	if (genres.length === 0) {
		return next(
			createCustomError(
				`Could not find authors with limit: ${limit} and offset: ${offset}`,
				404
			)
		);
	}

	res.json({
		pagination: { total: totalGenres, limit, offset },
		data: { genres },
	});
};
