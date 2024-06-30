const mongoose = require('mongoose');

const ARTSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

const ART = mongoose.model('ART', ARTSchema);

module.exports = ART;
