const bcrypt = require("bcrypt");

const createHash = (password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // el segundo parametro agrega una cadena aleatoria de x longitud
  return hashedPassword;
};

const isValidPasword = (user, password) => {
  const isValid = bcrypt.compareSync(password, user.password);
  return isValid;
};

module.exports = { createHash, isValidPasword };
