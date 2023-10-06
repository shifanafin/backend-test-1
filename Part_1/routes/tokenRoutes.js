const express = require('express');
const router = express.Router();
const { generateImageToken, getImageByToken } = require('../controller/tokenController');

router.route('/generate').post(generateImageToken);
router.route('/getAll').get(getImageByToken);


module.exports = router;
