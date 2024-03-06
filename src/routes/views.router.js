const { Router } = require("express");
const ProductManager = require("../dao/dbManagers/ProductManager.js");

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  let limit = req.query.limit;
  let page = req.query.page;
  let query = req.query.query;
  let sort = req.query.sort;
  try {
    const { products, rest, nextLink, prevLink } = await productManager.getProducts(
      limit,
      page,
      query,
      sort
    );
    console.log(rest);
    res.render("home", { products });
    res.send({...res,status: "success", payload: products, nextLink, prevLink})
  } catch (error) {}
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtimeproducts", { products });
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

module.exports = router;
