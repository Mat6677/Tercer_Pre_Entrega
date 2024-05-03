const { dao } = require("../config/config");
const CartDao =
  dao == "mongo" || dao == "MONGO"
    ? require("../dao/dbManagers/CartManager")
    : require("../dao/fileManagers/CartManager");

class CartService {
  constructor() {
    this.dao = new CartDao();
  }
  async getCarts() {
    return await this.dao.getCarts();
  }
  async getCartById(id) {
    return await this.dao.getCartById(id);
  }
  async createCart() {
    return await this.dao.createCart();
  }
  async updateCart(cartId, productId) {
    return await this.dao.updateCart(cartId, productId);
  }
  async addManyProducts(newProducts, cart) {
    return await this.dao.addManyProducts(newProducts, cart);
  }
  async deleteProductFromCart(cartId, productId, cart) {
    return await this.dao.deleteProductFromCart(cartId, productId, cart);
  }
  async updateProductQuantity(quantity, cartId, productId, cart) {
    return await this.dao.updateProductQuantity(
      quantity,
      cartId,
      productId,
      cart
    );
  }
  async deleteAllProductsFromCart(cartId) {
    return await this.dao.deleteAllProductsFromCart(cartId);
  }
  async purchase(cartId) {
    return await this.dao.purchase(cartId);
  }
}

module.exports = CartService;
