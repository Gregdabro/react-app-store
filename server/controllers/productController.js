const Product = require("../models/Product");
const ApiError = require("../error/ApiError")

class ProductController {
    async create(req, res, next) {
        try {
            const { name, image, category, colors, rate, price, description, isFavorite } = req.body
            const product = await Product.create({ name, image, category, colors, rate, price, description, isFavorite })
            res.status(201).send(product)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { productId } = req.params
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })
            res.send(updatedProduct)

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            const { productId } = req.params
            const removedProduct = await Product.findById(productId)
            await removedProduct.remove()
            return res.send(null)

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const productList = await Product.find()
            res.status(200).send(productList)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findById(({_id: id}))
            res.status(200).send(product)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

}

module.exports = new ProductController()