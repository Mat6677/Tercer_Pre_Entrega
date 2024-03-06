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
    await CartsModel.create(cart);
  }

  async updateCart(cartId, product) {
    const cart = await this.getCartById(cartId);
    const some = cart.products.some((p) => parseInt(p.product._id) == parseInt(product._id));
    if (some) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: product._id, quantity: 1 });
    }

    await CartsModel.updateOne({ _id: cartId }, cart);
  }

  async deleteProductFromCart(cartId, productId, cart) {
    const newCart = cart.products.filter(
      (p) => p.product.product !== productId
    );
    await CartsModel.updateOne(
      { _id: cartId },
      { $set: { products: newCart } }
    );
  }

  async updateProductQuantity(quantity, cartId, productId, cart) {
    const index = cart.products.findIndex((p) => p.product == productId);
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
