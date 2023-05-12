const { Router } = require('express');

const router = Router();
const imagesController = require('../controllers/images.controller');

//SAVE PROPMT AND URL
router.post("/URL", imagesController.save);
//SEND INFO
router.post("/SEND", imagesController.getIdByEmail);

module.exports = router
