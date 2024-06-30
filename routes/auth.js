const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    getRegisterPage,
    postRegister,
    getLoginPage,
    postLogin,
    logout,
    getForgotPasswordPage,
    postForgotPassword,
    getResetPasswordPage,
    postResetPassword
} = require('../controllers/authController');

router.get('/register', getRegisterPage);
router.post('/register', postRegister);

router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Logout Route
router.get('/logout', logout); // Buraya logout rotasını ekleyin

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/forgot-password', getForgotPasswordPage);
router.post('/forgot-password', postForgotPassword);

router.get('/reset-password/:token', getResetPasswordPage);
router.post('/reset-password', postResetPassword);

module.exports = router;
