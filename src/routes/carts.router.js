const { Router } = require("express");
const {
  getCarts,
  getCartById,
  addCart,
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  updateProductQuantity,
  addManyProducts,
  purchase,
} = require("../controllers/carts.controller");

const router = Router();

const userVerification = (req, res, next) => {
  if (req.session.user != "user" || req.session.user != "USER") {
    return res
      .status(403)
      .send({ status: "error", message: "Your rol is not user" });
  }
  next();
};

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", addCart);
router.post("/:cid/products/:pid", userVerification, addProductToCart);
router.post("/:cid/purchase", purchase);
router.delete("/:cid/products/:pid", deleteProductFromCart);
router.delete("/:cid", deleteAllProductsFromCart);
router.put("/:cid/products/:pid", updateProductQuantity);
router.put("/:cid", addManyProducts);

module.exports = router;
