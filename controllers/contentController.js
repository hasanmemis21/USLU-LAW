const Content = require('../models/Content');
const Visit = require('../models/Visit');
const FAQ = require('../models/FAQ');
const ART = require('../models/ART');
exports.getHomePage = async (req, res) => {
    try {
        const contents = await Content.find();
        await Visit.create({ visitedAt: new Date() });
        res.render('user/homepage', { contents, csrfToken: req.csrfToken() });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getContactPage = (req, res) => {
    res.render('user/contact', { csrfToken: req.csrfToken() });
};


exports.getServicesPage = (req, res) => {
    res.render('user/services', { title: 'Hizmetlerimiz', additionalCss: 'services.css', csrfToken: req.csrfToken() });
};



exports.getFaqPage = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.render('user/faq', { faqs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getArtPage = async (req, res) => {
    try {
        const arts = await ART.find();
        res.render('user/art', { arts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Hakkımızda sayfası kontrolü
exports.getAboutPage = (req, res) => {
    res.render('user/about', { csrfToken: req.csrfToken() });
};
