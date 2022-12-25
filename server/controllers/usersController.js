const User = require("../models/User");
const ApiError = require("../error/ApiError")

class UsersController {

    async remove(req, res, next) {
        try {
            const { userId } = req.params
            const removedUser = await User.findById(userId)
            await removedUser.remove()
            return res.send(null)

        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const usersList = await User.find()
            res.status(200).send(usersList)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {userId} = req.params
            const user = await User.findById(({_id: userId}))
            res.status(200).send(user)
        } catch (e) {
            next(ApiError.badRequestError(e.message))
        }
    }

}

module.exports = new UsersController()