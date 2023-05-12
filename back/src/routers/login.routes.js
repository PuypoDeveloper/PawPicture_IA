const { Router } = require('express');

const router = Router();
const userController = require("../controllers/users.controller")

//path to add user
router.post("/newUser", userController.createNew);
//verify user
router.post("/verifyUser", userController.verifyUser);

module.exports = router
