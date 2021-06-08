const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utilities/wrapAsync')
const user = require('../controllers/users');
// const { delete } = require('./campgrounds');

router.route('/register')
    .get((user.renderRegister))
    .post(wrapAsync(user.Register))


router.route('/login')
    .get(user.login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginSuccess)

router.get('/logout', user.logout)

module.exports = router;
