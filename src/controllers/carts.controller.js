const CartService = require("../services/cart.service");

const cartService = new CartService();

const ProductService = require("../services/product.service");

const productService = new ProductService();

const getCarts = async (req, res) => {
  const carts = await cartService.getCarts();
  res.send(carts);
};
const getCartById = async (req, res) => {
  const cart = await cartService.getCartById(parseInt(req.params.cid));

  if (!cart) {
    return res.status(400).send({ message: "Cart has not been found" });
  }
  res.send(cart.products);
};
const addCart = async (req, res) => {
  await cartService.createCart();

  res.send({ message: "success" });
};
const addProductToCart = async (req, res) => {
  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartService.getCartById(cartid);
  const product = await productService.getProductById(productId);
  if (!cart) {
    res.status(400).send("Cart does not exist");
  }
  if (!product) {
    res.status(400).send("Product does not exist");
  }

  await cartService.updateCart(cartid, productId);

  res.send({ status: "success" });
};
const deleteProductFromCart = async (req, res) => {
  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartService.getCartById(cartid);
  const product = await productService.getProductById(productId);
  if (!cart) {
    res.status(400).send("Cart does not exist");
  }
  if (!product) {
    res.status(400).send("Product does not exist");
  }

  await cartService.deleteProductFromCart(cartid, productId, cart);

  res.send({ status: "success" });
};
const deleteAllProductsFromCart = async (req, res) => {
  const cartid = req.params.cid;

  await cartService.deleteAllProductsFromCart(cartid);

  res.send({ status: "success" });
};
const updateProductQuantity = async (req, res) => {
  const { quantity } = req.body;

  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartService.getCartById(cartid);
  const product = await productService.getProductById(productId);
  if (!cart) {
    res.status(400).send("Cart does not exist");
  }
  if (!product) {
    res.status(400).send("Product does not exist");
  }

  await cartService.updateProductQuantity(quantity, cartid, productId, cart);

  res.send({ status: "success" });
};
const addManyProducts = async (req, res) => {
  const { newProducts } = req.body;

  const cartid = req.params.cid;
  const cart = await cartService.getCartById(cartid);
  if (!cart) {
    res.status(400).send("Cart does not exist");
  }

  await cartService.addManyProducts(newProducts, cart);

  res.send({ status: "success" });
};

const purchase = async (req, res) => {
  const cartid = req.params.cid;
  try {
    const result = await cartService.purchase(cartid);
    res.send({ state: "success", itemsLeft: result });
  } catch (error) {
    res.status(404).send({ state: "Error", error: error });
  }
};

module.exports = {
  getCarts,
  getCartById,
  addCart,
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  updateProductQuantity,
  addManyProducts,
  purchase,
};
