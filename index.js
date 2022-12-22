const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/router.js");
const apiRouters = require("./routers/apiRouter.js");
const fileUpload = require("express-fileupload");
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(fileUpload({}))
app.use(express.static(__dirname + '/public'));

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
