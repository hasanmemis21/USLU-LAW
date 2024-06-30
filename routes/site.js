const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/faq', contentController.getFaqPage);
router.get('/art', contentController.getArtPage);

module.exports = router;
