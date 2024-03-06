const { Router } = require("express");
const CartManager = require("../dao/dbManagers/CartManager.js");
const ProductManager = require("../dao/dbManagers/ProductManager.js");

const cartManager = new CartManager();
const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.send(carts);
});

router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(parseInt(req.params.cid));

  if (!cart) {
    return res.status(400).send({ message: "Cart has not been found" });
  }
  res.send(cart.products);
});

router.post("/", async (req, res) => {
  await cartManager.createCart();

  res.send({ message: "success" });
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartManager.getCartById(cartid);
  const product = await productManager.getProductById(productId);
  if (!cart) {
    res.status(400).send("Cart does not exist");
  }
  if (!product) {
    res.status(400).send("Product does not exist");
  }

  cartManager.updateCart(cartid, product, cart);

  res.send({ status: "success" });
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartManager.getCartById(cartid);
  const product = await productManager.getProductById(productId);
  if (!cart) {
    res.status(400).send("Cart does not exist");
  }
  if (!product) {
    res.status(400).send("Product does not exist");
  }

  cartManager.deleteProductFromCart(cartid, productId, cart);

  res.send({ status: "success" });
});

router.delete("/:cid", async (req, res) => {
  const cartid = req.params.cid;

  cartManager.deleteAllProductsFromCart(cartid);

  res.send({ status: "success" });
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;

  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartManager.getCartById(cartid);
  const product = await productManager.getProductById(productId);
  if (!cart) {
    res.status(400).send("Cart does not exist");
  }
  if (!product) {
    res.status(400).send("Product does not exist");
  }

  cartManager.updateProductQuantity(quantity, cartid, productId, cart);

  res.send({ status: "success" });
});

module.exports = router;
