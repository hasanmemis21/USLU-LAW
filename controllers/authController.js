const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getForgotPasswordPage = (req, res) => {
    res.render('auth/forgot-password', { csrfToken: req.csrfToken() });
};

exports.postForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error_msg', 'No account with that email found.');
            return res.redirect('/auth/forgot-password');
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Ethereal SMTP setup
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        const mailOptions = {
            from: '"Your Name" <yourname@example.com>',
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://${req.headers.host}/auth/reset-password/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        res.redirect('/auth/forgot-password');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getResetPasswordPage = (req, res) => {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }, (err, user) => {
        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('/auth/forgot-password');
        }
        res.render('auth/reset-password', { token: req.params.token, csrfToken: req.csrfToken() });
    });
};

exports.postResetPassword = async (req, res) => {
    const { password, password2, token } = req.body;
    if (password !== password2) {
        req.flash('error_msg', 'Passwords do not match.');
        return res.redirect(`/auth/reset-password/${token}`);
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('/auth/forgot-password');
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        req.flash('success_msg', 'Password has been reset. You can now log in with your new password.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getRegisterPage = (req, res) => {
    res.render('auth/register', { errors: [], csrfToken: req.csrfToken() });
};

exports.postRegister = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Lütfen tüm alanları doldurun' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Şifreler eşleşmiyor' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Şifre en az 6 karakter olmalıdır' });
    }

    if (errors.length > 0) {
        res.render('auth/register', {
            errors,
            name,
            email,
            password,
            password2,
            csrfToken: req.csrfToken()
        });
    } else {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                errors.push({ msg: 'Bu e-posta adresi zaten kayıtlı' });
                res.render('auth/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    csrfToken: req.csrfToken()
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(password, salt);
                await newUser.save();

                req.flash('success_msg', 'Başarıyla kayıt oldunuz. Şimdi giriş yapabilirsiniz.');
                res.redirect('/auth/login');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Sunucu Hatası');
        }
    }
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/'); // Ana sayfaya yönlendirme
    });
};
