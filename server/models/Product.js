const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String},
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    colors: [{type: Schema.Types.ObjectId, ref: "Color"}],
    rate: Number,
    price: {type: Number, required: true},
    isFavorite: {type: Boolean}
}, {
    timestamps: true
})

module.exports = model("ProductPage", schema)
