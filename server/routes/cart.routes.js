const express = require("express")
const router = express.Router({ mergeParams: true })
const authMiddleware = require("../middleware/authMiddleware")
const cartController = require("../controllers/cartController")

//CREATE
router.post("/",authMiddleware, cartController.create);
//UPDATE
router.put("/:id", authMiddleware, cartController.update);
//DELETE
router.delete("/:id", authMiddleware, cartController.remove);
//GET USER CART
router.get("/find/:userId", authMiddleware, cartController.getOne);
// //GET ALL
router.get("/", authMiddleware, cartController.getAll);

module.exports = router;
