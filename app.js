require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const csrfProtection = require('./middlewares/csrf');
const { trackOnlineUsers } = require('./middlewares/onlineUsers');
const expressLayouts = require('express-ejs-layouts');
const http = require('http');
const socketIo = require('socket.io');
const { trackVisits, getVisitCounts } = require('./middlewares/trackVisits');

// Passport Config
require('./config/passport')(passport);

// Initialize Express
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Socket.io setup
const io = socketIo(server);

let onlineUsersCount = 0;
let onlineUsers = [];
io.on('connection', (socket) => {
    onlineUsersCount++;
    io.emit('onlineUsers', onlineUsersCount);

    if (socket.request.user) {
        User.findByIdAndUpdate(socket.request.user._id, { isOnline: true }, { new: true }).exec();
    }

    socket.on('disconnect', () => {
        onlineUsersCount--;
        io.emit('onlineUsers', onlineUsersCount);

        if (socket.request.user) {
            logoutUser(socket.request.user._id);
        }
    });
});
// Connect to Database
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // views dizinini ayarlayın
app.set('layout', 'layouts/userLayout');  // Varsayılan layout dosyasını ayarlayın

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// CSRF Protection
app.use(csrfProtection);

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.csrfToken = req.csrfToken();
    res.locals.onlineUsersCount = app.locals.onlineUsersCount;  // Online kullanıcı sayısını global değişken olarak ekle
    res.locals.title = "Uslu Hukuk Bürosu"; // Varsayılan başlık
    next();
});


// Track Online Users
app.use(trackOnlineUsers);
app.use(trackVisits);
// Dashboard verilerini ayarlayın
app.get('/admin/dashboard', (req, res) => {
    const visitCounts = getVisitCounts();
    res.render('admin/dashboard', {
        user: req.user,
        users: [], // Kullanıcıları burada ekleyin
        totalVisits: visitCounts.totalVisits,
        dailyVisits: visitCounts.dailyVisits,
        weeklyVisits: visitCounts.weeklyVisits,
        monthlyVisits: visitCounts.monthlyVisits,
        yearlyVisits: visitCounts.yearlyVisits,
        onlineUsers: 0 // Çevrimiçi kullanıcı sayısını burada ekleyin
    });
});
// Set onlineUsers to be accessible in the app
app.set('onlineUsers', onlineUsers);

// Routes
app.use('/admin', require('./routes/admin'));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/content'));
app.use('/services', require('./routes/services'));
app.use('/faq', require('./routes/faq'));
app.use('/art', require('./routes/art'));

// Handle 404
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
