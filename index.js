import express from "express";
import { MONGODB_URL } from "./config.js";
// import { PORT, MONGODB_URL } from "./config.js";
import { Post } from ".//Models/postModels.js";
import postRoutes from "./Routes/postRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import mongoose from "mongoose";

import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8000;

// dotenv.config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.json());

app.use("/", authRoutes);
app.use("/posts", postRoutes);

//auth routes

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
