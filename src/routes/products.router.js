const { Router } = require("express");
const {
  getProducts,
  getProductById,
  addProduct,
  updatedProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post("/", addProduct);
router.put("/:pid", updatedProduct);
router.delete("/:pid", deleteProduct);

module.exports = router;
