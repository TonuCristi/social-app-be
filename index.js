import express from "express";
import dotenv from "dotenv";
dotenv.config();
import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import mongoose from "mongoose";
import cors from "cors";
import { WebSocketServer } from "ws";
import User from "./models/userModel.js";

// express app
const app = express();

const ws = new WebSocketServer({ port: 5173 });

ws.on("connection", function (client) {
  client.on("error", console.error);

  client.on("message", async function (msg) {
    const message = JSON.parse(msg);

    const {
      _id,
      name,
      email,
      birth_date,
      avatar,
      description,
      createdAt,
      updatedAt,
    } = await User.findById(message.to);

    const user = {
      _id,
      name,
      email,
      birth_date,
      avatar,
      description,
      createdAt,
      updatedAt,
    };

    // console.log(user);

    ws.clients.forEach((client) => client.send(JSON.stringify(user)));
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
