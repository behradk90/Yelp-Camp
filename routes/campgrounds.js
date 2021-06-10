const express = require('express');
const router = express.Router();
const campGrounds = require('../controllers/campgrounds')
const wrapAsync = require('../utilities/wrapAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(wrapAsync(campGrounds.index))
    // .post(isLoggedIn, validateCampground, wrapAsync(campGrounds.createCampground))
    .post(upload.array('image'), (req, res) => { console.log(req.body, req.files), res.send('It worked.') })


router.get('/new', isLoggedIn, campGrounds.newForm);

router.route('/:id')
    .get(wrapAsync(campGrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, wrapAsync(campGrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campGrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campGrounds.editCampground))


module.exports = router;