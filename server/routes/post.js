const { Router } = require("express");
const {
  postPost,
  getPost,
  getPosts,
  putPost,
  disconnectPost,
  deletePost,
  getUserPosts,
  draftPost,
} = require("../controller/controller");
const db = require('../models/queries')


const post = Router();

post.get("/", getPosts);
post.get("/:id", getPost);
post.get("/user/:userId", getUserPosts);

post.post("/", postPost);
post.post("/:id", postPost); // comment

post.put("/:id", authorCheck, putPost);
post.put("/:id/disconnect", authorCheck, disconnectPost);
post.put("/:id/draft",authorCheck ,draftPost);


post.delete("/:id/delete",authorCheck, deletePost);

module.exports = { post };

async function authorCheck(req, res, next) {
  const post = await db.getPost(req.params.id);
  console.log(post.authorId, req.user.id);

  if (post.authorId !== req.user.id) {
    console.log("no match")

    return res
      .status(403)
      .json({ error: "You are not authorized to edit this post." });
  }

  next();
}
