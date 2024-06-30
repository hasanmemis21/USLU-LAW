const { v4: uuidv4 } = require('uuid');

const visitCounts = {
    total: 0,
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
};

const getVisitCounts = () => visitCounts;

const trackVisits = (req, res, next) => {
    visitCounts.total++;
    visitCounts.daily++;
    visitCounts.weekly++;
    visitCounts.monthly++;
    visitCounts.yearly++;
    next();
};

module.exports = { trackVisits, getVisitCounts };
