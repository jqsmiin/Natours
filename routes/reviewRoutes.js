const express = require('express')
const reviewController = require('./../controllers/reviewController')
const authController = require('./../controllers/authController')

const { getAllReviews, createReview, deleteReview, updateReview, setTourUserIds, getReview } = reviewController
const { protect, restrictTo } = authController

const router = express.Router({ mergeParams: true })

router.use(protect)

router.route('/').get(getAllReviews).post(protect, restrictTo('user'), setTourUserIds, createReview)
router.route('/:id').get(getReview).patch(restrictTo('user', 'admin'), updateReview).delete(restrictTo('admin', 'user'), deleteReview)


module.exports = router;