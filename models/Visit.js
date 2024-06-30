// models/Visit.js
const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Visit', VisitSchema);
