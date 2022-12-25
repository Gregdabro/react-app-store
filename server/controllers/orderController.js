const Order = require("../models/Order")
const ApiError = require("../error/ApiError")

class OrderController {
    async create(req, res, next) {
        try {
            const newOrder = new Order(req.body)
            const savedOrder = await newOrder.save()
            res.status(201).json(savedOrder);

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            await Order.findByIdAndDelete(req.params.id)
            res.status(200).json("Order has been deleted...")

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const orders = await Order.find({ userId: req.params.userId })
            res.status(200).json(orders)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const orders = await Order.find()
            res.status(200).json(orders)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }
}

module.exports = new OrderController()