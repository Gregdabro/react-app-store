const express = require("express")
const router = express.Router({ mergeParams: true })
const categoryController = require("../controllers/categoryController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware")

router.post("/", checkRoleMiddleware("ADMIN"), categoryController.create)

router.delete("/:categoryId", checkRoleMiddleware("ADMIN"), categoryController.remove)

router.get("/", categoryController.getAll)

router.get("/:id", categoryController.getOne)


module.exports = router
