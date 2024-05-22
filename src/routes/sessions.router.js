const { Router } = require("express");
const passport = require("passport");
const {
  register,
  registerFail,
  login,
  loginFail,
  gitHubConnect,
  gitHubCallBack,
  logout,
  currentUser,
  sendResetEmail,
} = require("../controllers/sessions.controller");

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "api/sessions/registerFail",
  }),
  register
);
sessionRouter.get("/registerFail", registerFail);
sessionRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/api/session/loginFail" }),
  login
);
sessionRouter.get("/loginFail", loginFail);
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  gitHubConnect
);
sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  gitHubCallBack
);
sessionRouter.get("/logout", logout);
sessionRouter.get("/current", currentUser);
sessionRouter.get("/resetEmail", sendResetEmail);

module.exports = sessionRouter;
