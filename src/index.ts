import express from "express";
import authorRouter from "./routes/author";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/health", (req, res) => {
	res.status(200).json({ msg: "Alive!" });
});

app.use("/api/v1/author", authorRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Sever listening at http://localhost:${PORT}`);
});
