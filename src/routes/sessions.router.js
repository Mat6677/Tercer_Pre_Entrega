const { Router } = require("express");
const {
  register,
  registerFail,
  login,
  loginFail,
  gitHubConnect,
  gitHubCallBack,
  logout,
  currentUser,
} = require("../controllers/sessions.controller");

const sessionRouter = Router();

sessionRouter.post("/register", register);
sessionRouter.get("/registerFail", registerFail);
sessionRouter.post("/login", login);
sessionRouter.get("/loginFail", loginFail);
sessionRouter.get("/github", gitHubConnect);
sessionRouter.get("/githubcallback", gitHubCallBack);
sessionRouter.get("/logout", logout);
sessionRouter.get("/current", currentUser);

module.exports = sessionRouter;
