import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Успешное подключение к БД..."))
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.use("/api", authRoute);

app.listen(port, () => {
  console.log("Сервер запущен на порте " + port);
});
