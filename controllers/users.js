const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.Register = async (req, res) => {
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
}

module.exports.login = (req, res) => {
    res.render('users/login');
}

module.exports.loginSuccess = (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back '${username}'.`);
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Successfully logged out!")
    res.redirect('/campgrounds')
}