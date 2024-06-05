const { faker } = require("@faker-js/faker");
const ProductService = require("../services/product.service");
const productService = new ProductService();

const getProducts = async (req, res) => {
  try {
    const { products, rest } = await productService.getProducts();
    res.status(200).send({ products, rest });
  } catch (error) {
    req.logger.error(
      `${req.method} on ${req.url} - "Something failed"`
    );
    return res.status(500).json({ error: error });
  }
  
};
const getProductById = async (req, res) => {
  const product = await productService.getProductById(parseInt(req.params.pid));
  if (!product) {
    req.logger.error(
      `${req.method} on ${req.url} - "Product has not been found"`
    );
    return res.status(404).json({ error: "Product not found" });
  }
  res.send(product);
};
const addProduct = async (req, res) => {
  const user = req.user;
  const product = req.body;
  if (user.rol == "user") {
    res.status(401).send({status:"fail", message:"You can not add products being rol user"})
  }
  if (user.rol == "premium") {
    await productService.addProduct({ ...product, owner: user.email });
    res.status(200).send({ status: "success" });
  } else {
    await productService.addProduct(product);
    res.status(200).send({ status: "success" });
  }
};
const updatedProduct = async (req, res) => {
  await productService.updateProduct(parseInt(req.params.pid), req.body);

  res.send({ status: "success" });
};
const deleteProduct = async (req, res) => {
  const user = req.user;
  const product = productService.getProductById(req.params.pid);

  if (!product) {
    req.logger.error(
      `${req.method} on ${req.url} - "Product has not been found"`
    );
    res.status(404).send({ message: "Product not found" });
  }
  if (user.email == product.owner || user.rol == "admin") {
    await productService.deleteProduct(parseInt(req.params.pid));
    res.status(200).send({ status: "success" });
  } else {
    req.logger.error(
      `${req.method} on ${req.url} - "Can not delete products from another owner"`
    );
    res.status(401).send({ message: "Can not delete products from another owner" });
  }
};
const getMockingProducts = async (req, res) => {
  const products = [];

  for (let i = 0; i < 10; i++) {
    const product = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 0.25, max: 50 }),
      thumbnail: "N/A",
      stock: faker.datatype.number({ min: 0, max: 100 }),
      code: faker.datatype.uuid(),
      category: faker.commerce.department(),
    };
    products.push(product);
  }

  return res.status(500).send({ products });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updatedProduct,
  deleteProduct,
  getMockingProducts,
};
