const {Schema, model} = require("mongoose")

const schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true,ref: "User"},
    items: [
      {
          ItemId: { type: Schema.Types.ObjectId, required: true,ref: "Item" },
          quantity: {
              type: Number,
              required: true,
              default: 1
          },
          price: Number,
          total: {type: Number, required: true, default: 0}
      }
    ]
}, {
    timestamps: true
})

module.exports = model("Cart", schema)
