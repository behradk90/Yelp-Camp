const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');
const Review = require('../models/review');

const ExpressError = require('../utilities/ExpressError');
const wrapAsync = require('../utilities/wrapAsync');

const { campgroundSchema } = require('../schemas.js');



const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

router.post('/', validateCampground, wrapAsync(async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('INVALID CAMPGROUND DATA', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'New campground created!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    if (!campground) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}))

router.put('/:id', validateCampground, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Update successful!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', wrapAsync(async (req, res) => {
    const { id, title } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground deleted.');
    res.redirect('/campgrounds');
}))

module.exports = router;