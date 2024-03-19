const { Router } = require("express");
const ProductManager = require("../dao/dbManagers/ProductManager.js");
const CartManager = require("../dao/dbManagers/CartManager.js");

const productManager = new ProductManager();
const cartManager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { products, rest } = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtimeproducts", { products });
});

router.get("/products", async (req, res) => {
  let query = req.query.category ? req.query.category : false;
  let limit = req.query.limit;
  let page = req.query.page;
  let sort = req.query.sort;
  console.log(req.session.user)
  try {
    const { products, rest, nextLink, prevLink } =
      await productManager.getProducts(query, limit, page, sort);
    res.render("products", { products, nextLink, prevLink, ...rest, user: req.session.user });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

router.get("/product", async (req, res) => {
  const pid = req.query.pid;
  const product = await productManager.getProductById(pid);
  res.render("product", product);
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);
  const products = cart.products;
  res.render("carts", { cart, products });
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};

router.get("/register", publicAccess, (req, res) => {
  res.render("register", {});
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});


module.exports = router;
