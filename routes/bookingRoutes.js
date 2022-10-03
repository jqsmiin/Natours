const express = require('express')
const bookingController = require('./../controllers/bookingController')
const authController = require('./../controllers/authController')

const { protect, restrictTo } = authController
const { getCheckoutSession, getAllBookings, createBooking, getBooking, updateBooking, deleteBooking } = bookingController

const router = express.Router({ mergeParams: true })

router.use(protect)

router.get('/checkout-session/:tourId', getCheckoutSession)

router.use(restrictTo('admon', 'lead-guide'))

router.route('/').get(getAllBookings).post(createBooking)

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking)

module.exports = router;