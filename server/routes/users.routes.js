const express = require("express")
const router = express.Router({ mergeParams: true })
const usersController = require('../controllers/usersController')

router.get("/", usersController.getAll)

router.get("/:userId", usersController.getOne)

router.delete("/:userId", usersController.remove)




module.exports = router;
