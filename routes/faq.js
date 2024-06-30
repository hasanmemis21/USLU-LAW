const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated } = require('../middlewares/auth');

// EnsureAuthenticated middleware'ini kullanarak sadece yetkili kullanıcıların bu rotaya erişmesini sağlayın
router.get('/dashboard', ensureAuthenticated, adminController.getAdminDashboard);
router.get('/faq', ensureAuthenticated, adminController.getFaqPage);
router.get('/faq/add', ensureAuthenticated, adminController.getAddFaqPage);
router.post('/faq/add', ensureAuthenticated, adminController.addFaq);
router.get('/faq/edit/:id', ensureAuthenticated, adminController.getEditFaqPage);
router.post('/faq/edit/:id', ensureAuthenticated, adminController.editFaq);
router.post('/faq/delete/:id', ensureAuthenticated, adminController.deleteFaq);

module.exports = router;
