const ApiError = require("../error/ApiError")
const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const tokenService = require("../services/token.service")

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array()
                    }
                })
            }

            const {name, email, password, role, phone, age, address} = req.body
            const existingUser = await User.findOne({ email })

            if (existingUser) {
                return next(ApiError.badRequestError("EMAIL_EXIST"))
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const userRole = await Role.findOne({value: "USER"})
            const user = await User.create({
                name,
                email,
                role: role || userRole.value,
                password: hashedPassword,
                phone,
                age,
                address
            })

            const tokens = await tokenService.generate({ _id: user._id, email, role: user.role})
            await tokenService.save(user._id, tokens.refreshToken)

            res.status(201).send({ ...tokens, userId: user._id, user })

        } catch (e) {
            return next(ApiError.internalError(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array()
                    }
                })
            }

            const { email, password } = req.body
            const existingUser = await User.findOne({ email })

            if (!existingUser) {
                return next(ApiError.badRequestError("EMAIL_NOT_FOUND"))
            }

            const isPasswordEqual = await bcrypt.compare(password, existingUser.password)

            if (!isPasswordEqual) {
                return next(ApiError.badRequestError("INVALID_PASSWORD"))
            }

            const tokens = await tokenService.generate({ _id: existingUser._id, email, role: existingUser.role })
            await tokenService.save(existingUser._id, tokens.refreshToken)

            res.status(200).send({ ...tokens, userId: existingUser._id, user: existingUser })

        } catch (e) {
            return next(ApiError.internalError(e.message))
        }
    }

    async refresh(req, res, next) {
        try {
            const {refresh_token: refreshToken} = req.body
            const data = tokenService.validateRefresh(refreshToken)
            const dbToken = await tokenService.findToken(refreshToken)
            if (!data || !dbToken || data._id !== dbToken?.user?.toString()) {
                return next(ApiError.unauthorizedError())
            }

            const tokens = await tokenService.generate({ _id: data._id, email: data.email, role: data.role })

            await tokenService.save(data._id, tokens.refreshToken)

            res.status(200).send({ ...tokens, userId: data._id })

        } catch (e) {
            return next(ApiError.internalError(e.message))

        }
    }

}

module.exports = new AuthController()