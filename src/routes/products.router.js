const { Router } = require("express");
const {
  getProducts,
  getProductById,
  addProduct,
  updatedProduct,
  deleteProduct,
  getMockingProducts,
} = require("../controllers/products.controller");

const router = Router();

const adminVerification = (req, res, next) => {
  if (req.session.user.rol != "admin" || req.session.user.rol != "premium") {
    return res
      .status(403)
      .send({ status: "error", message: "Your rol is not admin" });
  }
  next();
};

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.get("/mockingproducts", getMockingProducts);
router.post("/", adminVerification, addProduct);
router.put("/:pid", adminVerification, updatedProduct);
router.delete("/:pid", adminVerification, deleteProduct);

module.exports = router;
