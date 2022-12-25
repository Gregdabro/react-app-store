const Item = require("../models/Item")
const ApiError = require("../error/ApiError")

class cartIemController {
    async create(req, res, next) {
        try {
            const newOrder = new Item(req.body)
            const savedOrder = await newOrder.save()
            res.status(201).json(savedOrder);
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async remove(req, res, next) {
        try {


        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const items = await Item.find({ userId: req.params.userId })
            res.status(200).json(items)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const cartItems = await Item.find()
            res.status(200).json(cartItems)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }
}

module.exports = new cartIemController()