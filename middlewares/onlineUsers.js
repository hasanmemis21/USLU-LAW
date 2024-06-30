// middlewares/onlineUsers.js
const User = require('../models/User');

const trackOnlineUsers = (req, res, next) => {
    if (req.user) {
        User.findByIdAndUpdate(req.user._id, { isOnline: true }, { new: true }).exec();
    }
    next();
};

const logoutUser = (userId) => {
    User.findByIdAndUpdate(userId, { isOnline: false }, { new: true }).exec();
};

module.exports = { trackOnlineUsers, logoutUser };
