import express from "express";
import mongoose from "mongoose";
import router from "./routers/router.js";
import apiRouters from "./routers/apiRouter.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", router);
app.use("/api", apiRouters);

const server = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aliwaydev:909074402@cluster0.gqe720e.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log("Server started" + PORT));
  } catch (e) {
    console.log(e);
  }
};

server();
