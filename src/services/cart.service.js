const CartDao = require("../dao/dbManagers/CartManager");


class CartService {
  constructor() {
    this.dao = new CartDao();
  }
  async getCarts() {
    return await this.dao.getCarts();
  }
  async getCartById(id) {
    return await this.dao.getCartById();
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
}

module.exports = CartService;
