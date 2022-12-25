const express = require("express")
const router = express.Router({ mergeParams: true })
const orderController = require("../controllers/orderController")
const authMiddleware = require("../middleware/authMiddleware")
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post("/", authMiddleware, orderController.create)

router.delete("/:id", checkRoleMiddleware("ADMIN"), orderController.remove)

router.get("/find/:userId", checkRoleMiddleware("ADMIN"), orderController.getOne)

router.get("/", checkRoleMiddleware("ADMIN"), orderController.getAll)

module.exports = router;
