const { Router } = require("express");
const {
  getHomeView,
  getRealTimeProductsView,
  getProductsView,
  getProductView,
  getCartView,
  getChatView,
  getRegisterView,
  getLoginView,
} = require("../controllers/views.controller");

const router = Router();

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};
const userVerification = (req, res, next) => {
  if (req.session.user != "user" || req.session.user != "USER") {
    return res
      .status(403)
      .send({ status: "error", message: "Your rol is not user" });
  }
  next();
};

router.get("/", getHomeView);
router.get("/realtimeproducts", getRealTimeProductsView);
router.get("/products", getProductsView);
router.get("/product", getProductView);
router.get("/carts/:cid", getCartView);
router.get("/chat", userVerification, getChatView);
router.get("/register", publicAccess, getRegisterView);
router.get("/login", publicAccess, getLoginView);

module.exports = router;
