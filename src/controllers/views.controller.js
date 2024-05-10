const ProductService = require("../services/product.service");
const CartService = require("../services/cart.service");
const productService = new ProductService();
const cartService = new CartService();

const getHomeView = async (req, res) => {
  try {
    const { products, rest } = await productService.getProducts();
    res.render("home", { products });
  } catch (error) {
    req.logger.error(`${req.method} on ${req.url} - Error: ${error}`);
    res.status(500).send({ status: "error", error });
  }
};

const getRealTimeProductsView = async (req, res) => {
  const products = await productService.getProducts();
  res.render("realtimeproducts", { products });
};

const getProductsView = async (req, res) => {
  let query = req.query.category ? req.query.category : false;
  let limit = req.query.limit;
  let page = req.query.page;
  let sort = req.query.sort;
  try {
    const { products, rest, nextLink, prevLink } =
      await productService.getProducts(query, limit, page, sort);

    res.render("products", {
      products,
      nextLink,
      prevLink,
      ...rest,
      user: req.session.user,
    });
  } catch (error) {
    req.logger.error(`${req.method} on ${req.url} - Error: ${error}`);
    res.status(500).send({ status: "error", error });
  }
};

const getProductView = async (req, res) => {
  const pid = req.query.pid;
  const product = await productService.getProductById(pid);
  res.render("product", product);
};

const getCartView = async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartService.getCartById(cid);
  const products = cart.products;
  res.render("carts", { cart, products });
};

const getChatView = (req, res) => {
  res.render("chat", {});
};

const getRegisterView = (req, res) => {
  res.render("register", {});
};

const getLoginView = (req, res) => {
  res.render("login");
};

module.exports = {
  getHomeView,
  getRealTimeProductsView,
  getProductsView,
  getProductView,
  getCartView,
  getChatView,
  getRegisterView,
  getLoginView,
};
