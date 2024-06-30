const express = require('express');
const router = express.Router();

router.get('/criminal-law', (req, res) => {
    res.render('services/criminal-law');
});

router.get('/commercial-law', (req, res) => {
    res.render('services/commercial-law');
});

router.get('/family-law', (req, res) => {
    res.render('services/family-law');
});

router.get('/enforcement-law', (req, res) => {
    res.render('services/enforcement-law');
});

router.get('/tax-law', (req, res) => {
    res.render('services/tax-law');
});

router.get('/insurance-law', (req, res) => {
    res.render('services/insurance-law');
});

router.get('/anayasa', (req, res) => {
    res.render('services/anayasa');
});
router.get('/is-sosyal', (req, res) => {
    res.render('services/is-sosyal');
});
router.get('/kisisel', (req, res) => {
    res.render('services/kisisel');
});

module.exports = router;
