const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    age: {type: String, required: true},
    address: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, defaultValue: "USER"}
}, {
    timestamps: true
})

module.exports = model("User", schema)
