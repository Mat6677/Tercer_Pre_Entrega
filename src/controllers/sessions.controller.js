const passport = require("passport");
const UserDTO = require("../dao/DTOs/user.dto");
const nodemailer = require("nodemailer");
const userModel = require("../models/users");
const { isValidPasword, createHash } = require("../utils/bcrypt");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
});

const register = async (req, res) => {
  console.log("register");
  res.send({ status: "Success", message: "User registered" });
};

const registerFail = (req, res) => {
  req.logger.error(`${req.method} on ${req.url} - "Authentication error"`);
  res.status(401).send({ status: "error", error: "Authentication error" });
};

const login = async (req, res) => {
  const user = req.user;
  req.session.user = new UserDTO(user);

  res.send({
    status: "success",
    payload: req.session.user,
    message: "Successfully logged",
  });
};

const loginFail = (req, res) => {
  req.logger.warning(`${req.method} on ${req.url} - "Login fail"`);
  res.status(401).send({ status: "error", error: "Login fail" });
};

const gitHubConnect = async (req, res) => {};

const gitHubCallBack = (req, res) => async (req, res) => {
  req.session.user = {
    name: req.user.first_name,
    email: req.user.email,
    age: req.user.age,
    rol: req.user.rol,
  };

  res.redirect("/products");
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      req.logger.error(
        `${req.method} on ${req.url} - "There was an error destroying session" - Error: ${err}`
      );
      return res.status(500).send("There was an error destroying session");
    }
    res.redirect("/login");
  });
};

const currentUser = (req, res) => {
  res.send({ user: new UserDTO(req.user) });
};

const sendResetEmail = async (req, res) => {
  try {
    await transport.sendMail({
      from: `Ecommerce password reset <${process.env.MAIL_AUTH_USER}>`,
      to: `${req.body}`,
      subject: "password reset",
      html: `
          <div>
            <p>Click in the next link to reset your password</p>
            <a href="/resetPassword">Link</a>
          </div>
      `,
    });
    req.user.email = req.body;
    res.status(200).send({ message: "Mail sended successfuly" });
  } catch (error) {
    res.status(404).send({ message: "Error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await userModel.find({ email: req.user.email });
    const newPassword = req.body;
    if (isValidPasword(user, newPassword)) {
      res
        .status(404)
        .send({
          status: "error",
          message: "The password can not be the same that it was",
        });
    }
    await userModel.updateOne(
      { _id: user._id },
      { ...user, password: createHash(newPassword) }
    );
    window.location.replace("/login")
  } catch (error) {
    res.status(404).send({message:"error", error: error.message})
  }
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
  sendResetEmail,
  resetPassword,
};
