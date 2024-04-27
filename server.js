import express from "express";
import dotenv from "dotenv";
dotenv.config();
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import mongoose from "mongoose";
import cors from "cors";
import { WebSocketServer } from "ws";

// express app
const app = express();

const wss = new WebSocketServer({ port: 5173 });

wss.on("connection", function (client) {
  client.on("error", console.error);

  client.on("message", function (msg) {
    console.log(wss);
    console.log(`received: ${msg}`);
    wss.clients.forEach((client) => client.send(JSON.stringify(`${msg}`)));
  });
});

// cors
app.use(
  cors({
    origin:
      process.env.MODE === "production"
        ? process.env.PROD_APP_URL
        : process.env.DEV_APP_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);

// middleware
app.use(express.json());

// routes
app.use("/users/", userRouter);
app.use("/posts/", postRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
