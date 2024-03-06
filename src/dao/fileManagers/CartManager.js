const fs = require("node:fs");

const pathFile = __dirname + "/files/carts.json";

export class CartManager {
  async getCarts() {
    if (!fs.existsSync(pathFile)) {
      await fs.promises.writeFile(pathFile, "[]");
    }

    let data = await fs.promises.readFile(pathFile, "utf-8");
    let carts = JSON.parse(data);
    return carts;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((c) => c.id == id);
    if (cart) {
      return cart;
    } else {
      return false;
    }
  }

  async createCart() {
    const carts = await this.getCarts();
    const id = carts.length === 0 ? 0 : Math.max(...carts.map((p) => p.id));
    carts.push({
      products: [],
      id: id + 1,
    });

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  }

  async updateCart(cart, product, indexOfProduct) {
    const carts = await this.getCarts();
    const indexOfCart = carts.findIndex((c) => c.id == cart.id);
    console.log(indexOfCart);
    if (carts[indexOfCart].products.find((p) => p.id === product.id)) {
      carts[indexOfCart].products[indexOfProduct].quantity += 1;

      await fs.promises.writeFile(pathFile, JSON.stringify(carts));
      return;
    }
    const id = product.id;
    carts[indexOfCart].products.push({ id, quantity: 1 });

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  }
}
