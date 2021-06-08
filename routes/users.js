const express = require('express');
const passport = require('passport');
const router = express.Router();
const wrapAsync = require('../utilities/wrapAsync')
const User = require('../models/user');
// const { delete } = require('./campgrounds');

router.get('/register', (req, res) => {
    res.render('users/register')
});

router.post('/register', wrapAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Hi '${username}'. Welcome to YelpCamp!`);
            res.redirect('/campgrounds');
        })

    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back '${username}'.`);
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Successfully logged out!")
    res.redirect('/campgrounds')
})

module.exports = router;