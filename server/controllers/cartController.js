const Cart = require("../models/Cart")
const ApiError = require("../error/ApiError")

class CartController {
    async create(req, res, next) {
        try {
            const newCart = new Cart(req.body)
            const savedCart = await newCart.save()
            res.status(201).json(savedCart)

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
              req.params.id,
              {
                  $set: req.body,
              },
              { new: true }
            )
            res.status(200).json(updatedCart)

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json("Cart has been deleted...")

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId })
            res.status(200).json(cart)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const carts = await Cart.find()
            res.status(200).json(carts)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }
}

module.exports = new CartController()