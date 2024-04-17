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
} = require("../controllers/carts.controller");

const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", addCart);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", deleteProductFromCart);
router.delete("/:cid", deleteAllProductsFromCart);
router.put("/:cid/products/:pid", updateProductQuantity);
router.put("/:cid", addManyProducts);

module.exports = router;
