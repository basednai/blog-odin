const { Router } = require("express");
const {signUpPost} = require("../controller/controller");

const signUp = Router();

signUp.post("/", signUpPost);

module.exports = { signUp };
