const FAQ = require('../models/FAQ');
const ART = require('../models/ART');

exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.render('faq', { faqs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getARTs = async (req, res) => {
    try {
        const arts = await ART.find();
        res.render('art', { arts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
