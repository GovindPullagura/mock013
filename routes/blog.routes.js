const express = require("express");
const { BlogModel } = require("../models/blog.model");
const blogRouter = express.Router();
var moment = require("moment");

blogRouter.post("/", async (req, res) => {
  const { username, title, content, category } = req.body;
  var date = new Date();
  moment(date).format("DD/MM/YYYY");
  try {
    const newBlog = new BlogModel({ username, title, content, category, date });
    await newBlog.save();
    res.send("Posted a new blog.");
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { blogRouter };
