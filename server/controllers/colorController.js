const Color = require("../models/Color");
const ApiError = require("../error/ApiError")
const Product = require("../models/Product");

class ColorController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const color = await Color.create({ name })
            res.status(200).send(color)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            const { colorId } = req.params

            const removedColor = await Product.findByIdAndUpdate(colorId)

            await removedColor.remove()
            return res.send(null)

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const colorList = await Color.find()
            res.status(200).send(colorList)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const color = await Color.findById(({_id: id}))
            res.status(200).send(color)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

}

module.exports = new ColorController()