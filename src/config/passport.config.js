const passport = require("passport");
const local = require("passport-local");
const { createHash, isValidPasword } = require("../utils");
const GithubStrategy = require("passport-github2");
const userModel = require("../models/users.js");
const CartManager = require("../dao/dbManagers/CartManager.js");

const cartManager = new CartManager();

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        let user = await userModel.findOne({ email: username });

        try {
          if (user) {
            return done(null, false);
          }
          const cart = await cartManager.createCart();

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            rol: email == "adminCoder@coder.com" ? "admin" : "user",
            cart: cart._id,
          };
          const result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        let user = await userModel.findOne({ email: username });
        try {
          if (!user) {
            return done(null, false);
          }
          if (!isValidPasword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.e31e9e259f379bb0",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        clientSecret: "486c5c28ac33a82bd1874fd672610a11ad2ee5c4",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });

          const cart = await cartManager.createCart();
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 0,
              email: profile._json.email,
              rol:
                profile._json.email == "adminCoder@coder.com"
                  ? "admin"
                  : "user",
              cart: cart._id,
            };
            let result = await userModel.create(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id);
  done(null, user);
});

module.exports = initializePassport;
