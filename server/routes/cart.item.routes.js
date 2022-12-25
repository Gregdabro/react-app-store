const express = require("express")
const router = express.Router({ mergeParams: true })
const authMiddleware = require("../middleware/authMiddleware")
const cartIemController = require("../controllers/cartItemController")

router.post("/", authMiddleware, cartIemController.create);

router.delete("/:id", authMiddleware, cartIemController.remove);

router.get("/find/:userId", authMiddleware, cartIemController.getOne);

router.get("/", authMiddleware, cartIemController.getAll);

module.exports = router;
