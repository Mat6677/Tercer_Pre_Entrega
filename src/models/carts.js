const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

cartSchema.pre("find", function (next) {
  this.populate("products.product");
  next();
});
const CartsModel = mongoose.model("carts", cartSchema);

module.exports = CartsModel;
