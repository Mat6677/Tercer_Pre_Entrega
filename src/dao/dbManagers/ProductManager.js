const ProductsModel = require("../../models/products");

class ProductManager {
  async getProducts(query, limit = 10, page = 1, sort = "asc") {
    const sortOrder = (sort === "asc" ? 1 : -1);

    const options = {};
    if (query) {
      options.category = query.charAt(0).toUpperCase() + query.slice(1);
    }

    const { docs, ...rest } = await ProductsModel.paginate(options, {
      limit: limit,
      page: page,
      lean: true,
      sort: { price: sortOrder },
    });
    const products = docs;
    let nextLink = rest.hasNextPage ? `/products/?page=${rest.nextPage}` : null;
    let prevLink = rest.hasPrevPage ? `/products/?page=${rest.prevPage}` : null;

    return { products, rest, nextLink, prevLink };
  }

  async getProductById(id) {
    const product = await ProductsModel.find({ _id: id }).lean();
    return product[0];
  }

  async addProduct(product) {
    await ProductsModel.create(product);
  }

  async updateProduct(id, updatedProduct) {
    await ProductsModel.updateOne({ _id: id }, updatedProduct);
  }

  async deleteProduct(id) {
    await ProductsModel.deleteOne({ _id: id });
  }
}

module.exports = ProductManager;
