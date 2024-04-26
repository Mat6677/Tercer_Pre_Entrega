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

router.get("/", getHomeView);
router.get("/realtimeproducts", getRealTimeProductsView);
router.get("/products", getProductsView);
router.get("/product", getProductView);
router.get("/carts/:cid", getCartView);
router.get("/chat", getChatView);
router.get("/register", publicAccess, getRegisterView);
router.get("/login", publicAccess, getLoginView);

module.exports = router;
