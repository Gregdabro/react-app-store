const express = require("express")
const router = express.Router({ mergeParams: true })
const {check} = require("express-validator")
const authController = require("../controllers/authController")


router.post("/signup", [
    check('name', "Имя пользователя не может быть пустым").notEmpty(),
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 })
], authController.registration)

router.post("/login", [
    check("email", "Email некорректный").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists()
], authController.login)

router.post("/token", authController.refresh)

module.exports = router
