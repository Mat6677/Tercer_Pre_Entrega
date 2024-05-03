const ProductService = require("../services/product.service");

const productService = new ProductService();

const getProducts = async (req, res) => {
  const { products, rest } = await productService.getProducts();
  res.send({ products, rest });
};
const getProductById = async (req, res) => {
  const product = await productService.getProductById(parseInt(req.params.pid));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.send(product);
};
const addProduct = async (req, res) => {
  const product = req.body;
  await productService.addProduct(product);
  res.send({ status: "success" });
};
const updatedProduct = async (req, res) => {
  await productService.updateProduct(parseInt(req.params.pid), req.body);

  res.send({ status: "success" });
};
const deleteProduct = async (req, res) => {
  if (await productService.deleteProduct(parseInt(req.params.pid))) {
    res.status(400).send({ message: "Product not found" });
  }
  res.send({ status: "success" });
};
const getMockingProducts = (req,res) => {
  
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updatedProduct,
  deleteProduct,
  getMockingProducts
};
