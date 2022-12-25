const mongoose = require("mongoose");
const {Schema} = require('mongoose')

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: {type: Schema.Types.ObjectId, ref: "ProductPage"},
    quantity: {
      type: Number,
      default: 1,
    },
    price: {type: Number, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", CartSchema);