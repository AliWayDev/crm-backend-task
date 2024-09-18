import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import apiRouter from "./routers/index.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());

app.use(apiRouter);

const server = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alinurlibekov:909074402@cluster0.yi03c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    app.listen(PORT, () => console.log("Server started" + PORT));
  } catch (e) {
    console.log(e);
  }
};

server();
