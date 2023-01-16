const express = require("express");
const { PostModel } = require("../models/postModel");

const UserRoutes = express.Router();

UserRoutes.get("/", async (req, res) => {
  const use = await PostModel.find();
  res.send(use);
});

UserRoutes.post("/create", async (req, res) => {
  const { title, body, device } = req.body;
  try {
    const new_post = new PostModel({
      title,
      body,
      device,
    });
    await new_post.save();
    res.send("saved new post");
  } catch (error) {
    console.log(error);
    res.send("Error occured while creating new post");
  }
});

//update
UserRoutes.patch("/update/:post", async (req, res) => {
  const postid = req.params.postid;

  try {
    await PostModel.findByIdAndUpdate(postid, req.body);
    res.send("Sending Update Request");
  } catch (error) {
    console.log(error);
    res.send("Error Occured");
  }
});

//delete
UserRoutes.delete("/delete/:post", async (req, res) => {
  const postid = req.params.postid;

  try {
    await PostModel.findByIdAndDelete(postid, req.body);
    res.send("Deleting Post");
  } catch (error) {
    console.log(error);
    res.send("Error Occured while Deleting post");
  }
});
module.exports = { UserRoutes };
