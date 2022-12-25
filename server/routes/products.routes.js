const express = require("express")
const router = express.Router({ mergeParams: true })
const productController = require("../controllers/productController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware")

router.post("/", checkRoleMiddleware("ADMIN"), productController.create)
router.patch("/:productId",checkRoleMiddleware("ADMIN"), productController.update)
router.delete("/:productId", checkRoleMiddleware("ADMIN"), productController.remove)
router.get("/",  productController.getAll)
router.get("/:id",productController.getOne)

module.exports = router
