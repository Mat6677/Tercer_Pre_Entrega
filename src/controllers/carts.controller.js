const CartService = require("../services/cart.service");

const cartService = new CartService();

const ProductService = require("../services/product.service");

const productService = new ProductService();

const getCarts = async (req, res) => {
  try {
    const carts = await cartService.getCarts();
    res.status(200).send(carts);
  } catch (error) {
    req.logger.error(`${req.method} on ${req.url} - "Something failed"`);
    return res.status(500).json({ error: error });
  }
};
const getCartById = async (req, res) => {
  const cart = await cartService.getCartById(parseInt(req.params.cid));

  if (!cart) {
    req.logger.error(`${req.method} on ${req.url} - "Cart has not been found"`);
    return res.status(404).send({ message: "Cart has not been found" });
  }
  res.send(cart.products);
};
const addCart = async (req, res) => {
  await cartService.createCart();

  res.status(200).send({ message: "success" });
};
const addProductToCart = async (req, res) => {
  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartService.getCartById(cartid);
  const product = await productService.getProductById(productId);
  if (product.owner == req.user.email) {
    req.logger.error(
      `${req.method} on ${req.url} - "The owner can not add his product to his own cart"`
    );
    res.status(400).send("Cart can not have this product");
  }

  if (!cart) {
    req.logger.error(`${req.method} on ${req.url} - "Cart does not exist"`);
    res.status(404).send("Cart does not exist");
  }
  if (!product) {
    req.logger.error(`${req.method} on ${req.url} - "Product does not exist"`);
    res.status(404).send("Product does not exist");
  }

  await cartService.updateCart(cartid, productId);

  res.status(200).send({ status: "success" });
};
const deleteProductFromCart = async (req, res) => {
  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartService.getCartById(cartid);
  const product = await productService.getProductById(productId);
  if (!cart) {
    req.logger.error(`${req.method} on ${req.url} - "Cart does not exist"`);
    res.status(404).send("Cart does not exist");
  }
  if (!product) {
    req.logger.error(`${req.method} on ${req.url} - "Product does not exist"`);
    res.status(404).send("Product does not exist");
  }

  await cartService.deleteProductFromCart(cartid, productId, cart);

  res.status.send({ status: "success" });
};
const deleteAllProductsFromCart = async (req, res) => {
  const cartid = req.params.cid;

  try {
    await cartService.deleteAllProductsFromCart(cartid);
    res.status(200).send({ status: "success" });
  } catch (error) {
    req.logger.error(`${req.method} on ${req.url} - "Cart does not exist"`);
    res.status(404).send("Cart does not exist");
  }
};
const updateProductQuantity = async (req, res) => {
  const { quantity } = req.body;

  const cartid = req.params.cid;
  const productId = req.params.pid;

  const cart = await cartService.getCartById(cartid);
  const product = await productService.getProductById(productId);
  if (!cart) {
    req.logger.error(`${req.method} on ${req.url} - "Cart does not exist"`);
    res.status(404).send("Cart does not exist");
  }
  if (!product) {
    req.logger.error(`${req.method} on ${req.url} - "Product does not exist"`);
    res.status(404).send("Product does not exist");
  }

  await cartService.updateProductQuantity(quantity, cartid, productId, cart);

  res.status(200).send({ status: "success" });
};
const addManyProducts = async (req, res) => {
  const { newProducts } = req.body;

  const cartid = req.params.cid;
  const cart = await cartService.getCartById(cartid);
  if (!cart) {
    req.logger.error(`${req.method} on ${req.url} - "Cart does not exist"`);
    res.status(404).send("Cart does not exist");
  }

  await cartService.addManyProducts(newProducts, cart);

  res.status(200).send({ status: "success" });
};

const purchase = async (req, res) => {
  const cartid = req.params.cid;
  const purchaser = req.session.user;
  try {
    const result = await cartService.purchase(cartid, purchaser);
    res.status.send({ state: "success", itemsLeft: result });
  } catch (error) {
    req.logger.error(`${req.method} on ${req.url} - Error:${error}`);
    res.status(500).send({ state: "Error", error });
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
