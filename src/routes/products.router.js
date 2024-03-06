const { Router } = require("express");
const ProductManager = require("../dao/dbManagers/ProductManager.js");

const productManager = new ProductManager("./src/Products.json");
const router = Router();

router.get("/", async (req, res) => {
  const {products, rest} = await productManager.getProducts();
  res.send({products, rest});
});

router.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.send(product);
});

router.post("/", async (req, res) => {
  const product = req.body;
  await productManager.addProduct(product);
  res.send({ status: "success" });
});

router.put("/:pid", async (req, res) => {
  await productManager.updateProduct(parseInt(req.params.pid), req.body);

  res.send({ status: "success" });
});

router.delete("/:pid", async (req, res) => {
  if (await productManager.deleteProduct(parseInt(req.params.pid))) {
    res.status(400).send({ message: "Product not found" });
  }
  res.send({ status: "success" });
});

module.exports = router;
