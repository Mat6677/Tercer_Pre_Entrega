const CartsModel = require("../../models/carts");

class CartManager {
  async getCarts() {
    const carts = await CartsModel.find().lean();
    return carts;
  }

  async getCartById(id) {
    const cart = await CartsModel.find({ _id: id }).lean();
    return cart[0];
  }

  async createCart() {
    const cart = { products: [] };
    const result = await CartsModel.create(cart);
    return result
  }

  async updateCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    const index = cart.products.findIndex((p) => p.product._id == productId);
    if (index >= 0) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await CartsModel.updateOne({ _id: cartId }, cart);
  }

  async addManyProducts(newProducts, cart) {
    newProducts.forEach((p) => {
      cart.products.push({ product: p._id, quantity: p.quantity || 1 });
    });
    await CartsModel.updateOne(
      {
        _id: cart._id,
      },
      cart
    );
  }

  async deleteProductFromCart(cartId, productId, cart) {
    const newCart = cart.products.filter((p) => p.product._id != productId);
    await CartsModel.updateOne(
      { _id: cartId },
      { $set: { products: newCart } }
    );
  }

  async updateProductQuantity(quantity, cartId, productId, cart) {
    const index = cart.products.findIndex((p) => p.product._id == productId);
    cart.products[index].quantity = quantity;

    await CartsModel.updateOne({ _id: cartId }, cart);
  }

  async deleteAllProductsFromCart(cartId) {
    const cart = this.getCartById(cartId);
    cart.products = [];
    await CartsModel.updateOne({ _id: cartId }, cart);
  }
}

module.exports = CartManager;
