// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/adminController');
// const { ensureAuthenticated } = require('../middlewares/auth');
// const trackVisits = require('../middlewares/trackVisits');


// router.use(trackVisits);
// router.get('/dashboard', ensureAuthenticated, adminController.getAdminDashboard);
// router.get('/faq', ensureAuthenticated, adminController.getFaqPage);
// router.get('/faq/add', ensureAuthenticated, adminController.getAddFaqPage);
// router.post('/faq/add', ensureAuthenticated, adminController.addFaq);
// router.get('/faq/edit/:id', ensureAuthenticated, adminController.getEditFaqPage);
// router.post('/faq/edit/:id', ensureAuthenticated, adminController.editFaq);
// router.post('/faq/delete/:id', ensureAuthenticated, adminController.deleteFaq); // Bu rota silme işlemi için gerekli

// module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated } = require('../middlewares/auth');
const { trackVisits } = require('../middlewares/trackVisits');

router.use(trackVisits);

router.get('/dashboard', ensureAuthenticated, adminController.getAdminDashboard);
router.get('/faq', ensureAuthenticated, adminController.getFaqPage);
router.get('/faq/add', ensureAuthenticated, adminController.getAddFaqPage);
router.post('/faq/add', ensureAuthenticated, adminController.addFaq);
router.get('/faq/edit/:id', ensureAuthenticated, adminController.getEditFaqPage);
router.post('/faq/edit/:id', ensureAuthenticated, adminController.editFaq);
router.post('/faq/delete/:id', ensureAuthenticated, adminController.deleteFaq);

router.get('/art', ensureAuthenticated, adminController.getArtPage);
router.get('/art/add', ensureAuthenticated, adminController.getAddArtPage);
router.post('/art/add', ensureAuthenticated, adminController.addArt);
router.get('/art/edit/:id', ensureAuthenticated, adminController.getEditArtPage);
router.post('/art/edit/:id', ensureAuthenticated, adminController.editArt);
router.post('/art/delete/:id', ensureAuthenticated, adminController.deleteArt);


module.exports = router;

