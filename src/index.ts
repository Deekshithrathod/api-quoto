import express from "express";
import authorRouter from "./routes/author";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "Alive!" });
});

app.use("/api/v1/author", authorRouter);

app.listen(PORT, () => {
  console.log(`Sever listening at http://localhost:${PORT}`);
});
