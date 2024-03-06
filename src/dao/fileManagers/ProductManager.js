const fs = require("node:fs")

const pathFile = __dirname + "/files/products.json";

export class ProductManager {
  productVerifictions(product) {
    if (
      !product.hasOwnProperty("title") ||
      typeof product.title !== "string" ||
      product.title.length < 1
    ) {
      return {
        result: "Error",
        message:
          'The "title" property must exist, be of type string and have more than 1 character length.',
      };
    }
    if (
      !product.hasOwnProperty("description") ||
      typeof product.description !== "string"
    ) {
      return {
        result: "Error",
        message: 'The "description" property must exist and be of type string.',
      };
    }

    if (!product.hasOwnProperty("price") || typeof product.price !== "number") {
      return {
        result: "Error",
        message: 'The "price" property must exist and be of type number.',
      };
    }
    if (!product.hasOwnProperty("code") || typeof product.code !== "string") {
      return {
        result: "Error",
        message: 'The "code" property must exist and be of type string.',
      };
    }

    if (!product.hasOwnProperty("stock") || typeof product.stock !== "number") {
      return {
        result: "Error",
        message: 'The "stock" property must exist and be of type number.',
      };
    }

    if (
      product.hasOwnProperty("status") &&
      typeof product.status !== "boolean"
    ) {
      return {
        result: "Error",
        message: 'The "status" property be of type boolean.',
      };
    }

    if (
      !product.hasOwnProperty("category") ||
      typeof product.code !== "string"
    ) {
      return {
        result: "Error",
        message: 'The "category" property must exist and be of type string.',
      };
    }

    if (
      product.hasOwnProperty("thumbnail") &&
      !Array.isArray(product.thumbnail)
    ) {
      return {
        result: "Error",
        message: 'The "thumbail" property must be an Array of strings.',
      };
    }
  }

  async getProducts() {
    if (!fs.existsSync(pathFile)) {
      await fs.promises.writeFile(pathFile, "[]");
    }

    let data = await fs.promises.readFile(pathFile, "utf-8");
    let products = JSON.parse(data);
    return products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id == id);
    if (product) {
      return product;
    } else {
      return false;
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    if (products.find((p) => p.title === product.title)) {
      return {
        result: "Error",
        message: 'The product already',
      };
    }
    const id =
      products.length === 0 ? 0 : Math.max(...products.map((p) => p.id));

    products.push({ ...product, id: id + 1 });

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const oldProduct = products.find((p) => p.id === id);
    const indexOfProduct = products.indexOf(oldProduct);
    products[indexOfProduct] = { ...oldProduct, ...updatedProduct };

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id == id);
    if (!product) {
      return { result: "Error" };
    }
    const updatedProducts = products.filter((p) => p != product);

    await fs.promises.writeFile(pathFile, JSON.stringify(updatedProducts));
  }
}