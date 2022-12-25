const express = require("express")
const router = express.Router({ mergeParams: true })
const colorController = require("../controllers/colorController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware")

router.post("/", checkRoleMiddleware("ADMIN") ,colorController.create)

router.delete("/:colorId", checkRoleMiddleware("ADMIN") ,colorController.remove)

router.get("/", colorController.getAll)

router.get("/:id", colorController.getOne)


module.exports = router
