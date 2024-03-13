const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  rol: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
