const FAQ = require('../models/FAQ');
const ART = require('../models/ART');
const User = require('../models/User');
const Visit = require('../models/Visit');
const slugField = require("../helpers/slugfield");

const { getVisitCounts } = require('../middlewares/trackVisits');

exports.getAdminDashboard = (req, res) => {
    const visitCounts = getVisitCounts();
    res.render('admin/dashboard', {
        user: req.user,
        users: [
            { name: 'hasan', email: 'hasan172mms@gmail.com', role: 'admin', online: false },
            { name: 'Hasan', email: 'hasan21memis@gmail.com', role: 'admin', online: false }
        ],
        totalVisits: visitCounts.totalVisits,
        dailyVisits: visitCounts.dailyVisits,
        weeklyVisits: visitCounts.weeklyVisits,
        monthlyVisits: visitCounts.monthlyVisits,
        yearlyVisits: visitCounts.yearlyVisits,
        onlineUsers: 0 // This value should be dynamically set based on your online users tracking logic
    });
};

exports.getFaqPage = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.render('admin/faq', {
            user: req.user,
            faqs: faqs,
            content: 'faqs' // İçeriği doğru şekilde gönderiyoruz
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddFaqPage = (req, res) => {
    res.render('admin/addFaq', {
        content: 'addFaq' // İçeriği doğru şekilde gönderiyoruz
    });
};

exports.addFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFaq = new FAQ({
            question,
            answer,
            slug: slugField(question) // Slug ekleyin
        });
        await newFaq.save();
        req.flash('success_msg', 'Soru başarıyla eklendi.');
        res.redirect('/admin/faq');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getEditFaqPage = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        res.render('admin/editFaq', {
            user: req.user,
            faq: faq,
            csrfToken: req.csrfToken(),
            content: 'editFaq'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.editFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        await FAQ.findByIdAndUpdate(req.params.id, {
            question,
            answer,
            slug: slugField(question) // Slug ekleyin
        });
        req.flash('success_msg', 'Soru başarıyla güncellendi.');
        res.redirect('/admin/faq');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        await FAQ.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Soru başarıyla silindi.');
        res.redirect('/admin/faq');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getArtPage = async (req, res) => {
    try {
        const arts = await ART.find();
        res.render('admin/art', {
            user: req.user,
            arts: arts,
            content: 'arts' // İçeriği doğru şekilde gönderiyoruz
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getAddArtPage = (req, res) => {
    res.render('admin/addArt', {
        content: 'addArt',
        csrfToken: req.csrfToken() // CSRF tokenini ekleyin
    });
};

exports.addArt = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Form verilerini kontrol etmek için loglama yapın
        console.log('Title:', title);
        console.log('Content:', content);

        if (!title || !content) {
            req.flash('error_msg', 'Title and content are required.');
            return res.redirect('/admin/art/add');
        }

        const newArt = new ART({
            title,
            content,
            slug: slugField(title) // Slug ekleyin
        });

        await newArt.save();
        req.flash('success_msg', 'Art successfully added.');
        res.redirect('/admin/art');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getEditArtPage = async (req, res) => {
    try {
        const art = await ART.findById(req.params.id);
        res.render('admin/editArt', {
            user: req.user,
            art: art,
            csrfToken: req.csrfToken(),
            content: 'editArt'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.editArt = async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log('Title:', title);
        console.log('Content:', content);

        if (!title || !content) {
            req.flash('error_msg', 'Title and content are required.');
            return res.redirect(`/admin/art/edit/${req.params.id}`);
        }
        await ART.findByIdAndUpdate(req.params.id, {
            title,
            content,
            slug: slugField(title) // Slug ekleyin
        });
        req.flash('success_msg', 'Art successfully updated.');
        res.redirect('/admin/art');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteArt = async (req, res) => {
    try {
        await ART.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Makaleler başarıyla silindi.');
        res.redirect('/admin/art');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getArts = async (req, res) => {
    try {
        const arts = await ART.find();
        res.render('user/art', { arts }); // 'user/art' olarak render ediyoruz
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getArtById = async (req, res) => {
    try {
        const art = await ART.findById(req.params.id);
        res.render('user/article', { art }); // 'user/article' olarak render ediyoruz
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
