const {Schema, model} = require("mongoose")

const schema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true,ref: "User"},
  userName: {type: String},
  products: [
    {
      productId: { type: Schema.Types.ObjectId, required: true,ref: "ProductPage" },
      name: {type: String},
      selectedColor: {type: String},
      amount: {
        type: Number,
        default: 1
      }
    }
  ],
  total: {type: Number, required: true}
}, {
  timestamps: true
})

module.exports = model("Order", schema)
