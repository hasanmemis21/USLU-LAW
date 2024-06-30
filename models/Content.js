const mongoose = require('mongoose');
const slugify = require('slugify');

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['page'],
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    page: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

ContentSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
