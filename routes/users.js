const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utilities/wrapAsync')
const user = require('../controllers/users');
// const { delete } = require('./campgrounds');

router.get('/register', (user.renderRegister));
router.post('/register', wrapAsync(user.Register));
router.get('/login', user.login)
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginSuccess)
router.get('/logout', user.logout)

module.exports = router;