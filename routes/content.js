const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/', contentController.getHomePage);
router.get('/about', contentController.getAboutPage);
router.get('/contact', contentController.getContactPage);
router.get('/news', (req, res) => { res.redirect('https://www.hukukihaber.net/'); });
router.get('/faq', contentController.getFaqPage);
router.get('/art', contentController.getArtPage);
router.get('/services', contentController.getServicesPage);


module.exports = router;
