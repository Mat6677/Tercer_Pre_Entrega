const passport = require("passport");
const UserDTO = require("../dao/DTOs/user.dto");

const register = () => {
  passport.authenticate("register", {
    failureRedirect: "api/sessions/registerFail",
  }),
    async (req, res) => {
      res.send({ status: "Success", message: "User registered" });
    };
};

const registerFail = (req, res) => {
  res.status(401).send({ status: "error", error: "Authentication error" });
};

const login = () => {
  passport.authenticate("login", { failureRedirect: "/api/session/loginFail" }),
    async (req, res) => {
      const user = req.user;
      req.session.user = new UserDTO(user);

      res.send({
        status: "success",
        payload: req.session.user,
        message: "Successfully logged",
      });
    };
};

const loginFail = (req, res) => {
  res.status(401).send({ status: "error", error: "Login fail" });
};

const gitHubConnect = async (req, res) => {};

const gitHubCallBack = () => (req, res) => {
  passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
      req.session.user = {
        name: req.user.first_name,
        email: req.user.email,
        age: req.user.age,
        rol: req.user.rol,
      };

      res.redirect("/products");
    };
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("There was an error destroying session");
    }
    res.redirect("/login");
  });
};

const currentUser = (req, res) => {
  res.send({ user: req.user });
};

module.exports = {
  register,
  registerFail,
  login,
  loginFail,
  gitHubConnect,
  gitHubCallBack,
  logout,
  currentUser,
};
