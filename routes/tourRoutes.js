const express = require('express')
const tourController = require('./../controllers/tourController')
const authController = require('./../controllers/authController')
// const reviewController = require('./../controllers/reviewController')
const reviewRouter = require('./../routes/reviewRoutes')

const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan, getToursWithin, getDistances, uploadTourImages, resizeTourImages } = tourController
const { protect, restrictTo } = authController
// const { createReview } = reviewController

const router = express.Router()

// router.route('/:tourId/reviews').post(protect, restrictTo('user'), createReview)

router.use('/:tourId/reviews', reviewRouter)

// router.param('id', checkID)          
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan)
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithin)
// /tours-distance?distance=233,center=-40,45,unit=miles
// /tours-distance/233/center/-40,45/unit/miles
router.route('/distances/:latlng/unit/:unit').get(getDistances)

router.route('/').get(getAllTours).post(protect, restrictTo('admin', 'lead-guide'), createTour)
router.route('/:id').get(getTour).patch(protect, restrictTo('admin', 'lead-guide'), uploadTourImages, resizeTourImages, updateTour).delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router