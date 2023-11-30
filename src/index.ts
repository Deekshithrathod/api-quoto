import express from "express";
import authorRouter from "./routes/author";
import genreRouter from "./routes/genre";
import quoteRouter from "./routes/quote";
import { errorHandler } from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", (req, res) => {
	res.status(200).json({ msg: "Alive!" });
});

app.use("/api/v1/author", authorRouter);
app.use("/api/v1/genre", genreRouter);
app.use("/api/v1/quote", quoteRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
	console.log(`Sever listening at http://localhost:${PORT}`);
});
