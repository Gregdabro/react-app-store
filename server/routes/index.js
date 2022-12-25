const express = require("express")
const router = express.Router({ mergeParams: true })

router.use("/auth", require("./auth.routes"))
router.use("/products", require("./products.routes"))
router.use("/category", require("./category.routes"))
router.use("/color", require("./color.routes"))
router.use("/cart", require("./cart.routes"))
router.use("/cart-item", require("./cart.item.routes"))
router.use("/orders", require("./orders.routes"))
router.use("/users", require("./users.routes"))

module.exports = router
