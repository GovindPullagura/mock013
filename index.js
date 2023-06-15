const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { blogRouter } = require("./routes/blog.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bloggers Home");
});

app.use("/api", userRouter);
app.use("/api/blog", blogRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
  console.log("Listening...");
});
