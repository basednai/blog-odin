const { Router } = require("express");
const { postPost, getPost, getPosts, putPost, disconnectPost, deletePost, getUserPosts } = require("../controller/controller");

const post = Router();

post.get("/", getPosts);
post.get("/:id", getPost);
post.get("/user/:userId", getUserPosts);

post.post("/", postPost);
post.post("/:id", postPost);
post.post("/:id", (req, res) => {
  res.send("POST recieved a /post endpoint with specified id");
});

post.put('/:id', putPost)
post.put('/:id/disconnect', disconnectPost)

post.delete('/:id/:delete', deletePost)

module.exports = { post };
