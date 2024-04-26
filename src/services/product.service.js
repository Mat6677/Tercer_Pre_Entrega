const { dao } = require("../config/config");
const ProductDao =
  dao == "mongo" || dao == "MONGO"
    ? require("../dao/dbManagers/ProductManager")
    : require("../dao/fileManagers/ProductManager");

class ProductService {
  constructor() {
    this.dao = new ProductDao();
  }
  async getProducts(query, limit = 10, page = 1, sort = "asc") {
    return await this.dao.getProducts(query, limit, page, sort);
  }
  async getProductById(id) {
    return await this.dao.getProductById(id);
  }
  async addProduct(product) {
    return await this.dao.addProduct(product);
  }
  async updateProduct(id, updatedProduct) {
    return await this.dao.updateProduct(id, updatedProduct);
  }
  async deleteProduct(id) {
    return await this.dao.deleteProduct(id);
  }
}

module.exports = ProductService;
