const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getArts);
router.get('/:id', adminController.getArtById);
router.get('/admin/dashboard', adminController.getAdminDashboard);
router.get('/admin/art', adminController.getArtPage);
router.get('/admin/art/add', adminController.getAddArtPage);
router.post('/admin/art/add', adminController.addArt);
router.get('/admin/art/edit/:id', adminController.getEditArtPage);
router.post('/admin/art/edit/:id', adminController.editArt);
router.post('/admin/art/delete/:id', adminController.deleteArt);

module.exports = router;
