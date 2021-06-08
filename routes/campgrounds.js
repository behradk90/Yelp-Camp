const express = require('express');
const router = express.Router();
const campGrounds = require('../controllers/campgrounds')

const wrapAsync = require('../utilities/wrapAsync');

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');




router.get('/', wrapAsync(campGrounds.index))
router.get('/new', isLoggedIn, campGrounds.newForm)
router.post('/', isLoggedIn, validateCampground, wrapAsync(campGrounds.createCampground))
router.get('/:id', wrapAsync(campGrounds.showCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campGrounds.editCampground))
router.put('/:id', isLoggedIn, isAuthor, validateCampground, wrapAsync(campGrounds.updateCampground))
router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(campGrounds.deleteCampground))

module.exports = router;