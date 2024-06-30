const slugify = require('slugify');

const generateSlug = (req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title, { lower: true, strict: true });
    }
    next();
};

module.exports = generateSlug;
