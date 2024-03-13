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
  let limit = req.query.limit;
  let page = req.query.page;
  try {
    const { products, rest, nextLink, prevLink } =
      await productManager.getProducts(limit, page);
    res.render("products", { products, nextLink, prevLink, ...rest });
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
  console.log(products);
  res.render("carts", { cart, products });
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

const privateAccess = (req, res, next) => {
  if (!req.session.user) {
    console.log("not logged in");
    return res.redirect("/login");
  }
  next();
};
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

router.get("/profile", privateAccess, (req, res) => {
  res.render("profile", { user: req.session.user });
});

module.exports = router;
