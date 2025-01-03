const { post, home, logIn, signUp, logOut } = require("./routes/routes");

const express = require("express");
const app = express();
const passport = require("./config/passport.js");

app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", home);
app.use('/signup', signUp)
app.use("/login", logIn);
app.use("/post", passport.authenticate("jwt", { session: false }), post);
app.use("/logout", logOut);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
