const db = require("../models/queries");
const { validateSignUp } = require("../utils/input-validation");
const pw = require("../utils/pw-encrypt");
const { validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.signUpPost = [
  validateSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // res.render("sign-up", { errors: errors.array() });
      res.send(errors.array().map((error) => "msg: " + error.msg));
      return;
    }

    req.body.password = await pw.encryptPW(req.body.password);

    try {
      const result = await db.addUser(req.body);
      // res.redirect("/sign-in");
      res.send(result);
    } catch (error) {
      return error;
    }
  },
];

exports.logInPost = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "cats");
      // localStorage.setItem("token", token); do this on client

      return res.json({ user, token });
    });
  })(req, res);
};

exports.postPost = async (req, res) => {
  const userId = req.user.id;
  const { content, publish } = req.body;
  const parentId = req.params.id || undefined;

  try {
    const post = await db.addPost(userId, content, publish, parentId);

    return res.send(post);
  } catch (error) {
    return error;
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;


  try {
    const post = await db.getPost(id);


    return res.send(post);
  } catch (error) {
    console.log(error);

    return error;
  }
};

exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await db.getUserPosts(userId);

    return res.send(posts);
  } catch (error) {
    return error;
  }
};

exports.putPost = async (req, res) => {
  const { id } = req.params;
  const { content, publish } = req.body;
  try {
    const post = await db.putPost(id, content, publish);

    return res.send(post);
  } catch (error) {
    return error;
  }
};

exports.draftPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { content } = req.body;

  try {
    const post = await db.draftPost(userId, id, content);

    return res.send(post);
  } catch (error) {
    return error;
  }
};

exports.disconnectPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.disconnectPost(id);

    return res.send(post);
  } catch (error) {
    return error;
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.deletePost(id);

    return res.send(post);
  } catch (error) {
    return error;
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await db.getPosts();

    return res.send(posts); //.map((post) => post.content));
  } catch (error) {
    return error;
  }
};

exports.logout = (req, res, next) => {
  res.send("remove jwt on client side and redirect");
};
