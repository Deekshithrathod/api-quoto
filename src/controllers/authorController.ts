import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAuthors = async (req: Request, res: Response) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  console.log(limit, offset);

  const authors = await prisma.author.findMany();

  // paginate response & add Internal Server Error if there's a DB connection failures
  res.json({ data: authors });
};

export const getAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = await prisma.author.findUnique({
    where: { id: Number(id) },
  });
  if (!author) {
    throw new Error("Author not found");
  }

  res.json({ data: { author } });
};
