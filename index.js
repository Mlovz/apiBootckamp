import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(process.env.DB)
  .then(() => console.log("DB..."))
  .catch(() => console.log("Error"));

app.use("/api", authRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server listening " + PORT);
});
