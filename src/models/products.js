const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "N/A",
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

productScheme.plugin(mongoosePaginate);
const ProductsModel = mongoose.model("products", productScheme);

module.exports = ProductsModel;
