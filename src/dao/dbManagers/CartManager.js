const CartsModel = require("../../models/carts");
const TicketModel = require("../../models/ticket");

const ProductService = require("../../services/product.service");
const productService = new ProductService();

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
    return result;
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
    const cart = await this.getCartById(cartId);
    cart.products = [];
    await CartsModel.updateOne({ _id: cartId }, cart);
  }

  async purchase(cartId, purchaser) {
    const cart = await this.getCartById(cartId);
    let totalAmount = 0;
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].quantity < cart.products[i].product.stock) {
        totalAmount +=
          cart.products[i].product.price * cart.products[i].quantity;

        /** STOCK UPDATE */
        productService.updateProduct(cart.products[i].product._id, {
          stock: cart.products[i].product.stock - cart.products[i].quantity,
        });
      }
    }
    
    try {
      const date = new Date()
      const fecha = `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}-${date.getDay() < 10 ? '0' + date.getDay() : date.getDay()}`
      const hora = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
      /** TICKET */
      await TicketModel.create({
        code: `${fecha}${hora}${"test@gmail.com"}`,
        purchase_datetime: `${fecha}/${hora}`,
        amount: totalAmount,
        purchaser: "test@gmail.com",
      });
    } catch (error) {
      console.log(error);
    }

    cart.products = cart.products.filter((p) => p.quantity > p.product.stock);

    await CartsModel.updateOne({ _id: cart._id }, cart);
    return cart;
  }
}

module.exports = CartManager;
