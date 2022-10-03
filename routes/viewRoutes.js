const express = require('express')
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')
const bookingController = require('../controllers/bookingController')
const router = express.Router()

const CSP = 'Content-Security-Policy';
const POLICY =
    "default-src 'self' https://*.mapbox.com ;" +
    "base-uri 'self';block-all-mixed-content;" +
    "font-src 'self' https: data:;" +
    "frame-ancestors 'self';" +
    "img-src http://localhost:8000 'self' blob: data:;" +
    "object-src 'none';" +
    "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
    "script-src-attr 'none';" +
    "style-src 'self' https: 'unsafe-inline';" +
    'upgrade-insecure-requests;';

const { getOverview, getTour, getLoginForm, getAccount, updateUserData, getMyTours } = viewController

router.use((req, res, next) => {
    res.setHeader(CSP, POLICY);
    next();
});

router.get('/', bookingController.createBookingCheckout, authController.isLoggedIn, getOverview)
router.get('/login', authController.isLoggedIn, getLoginForm)
router.get('/tour/:slug', authController.isLoggedIn, getTour)
router.get('/me', authController.protect, getAccount)
router.get('/my-tours', authController.protect, getMyTours)
router.post('/submit-user-data', authController.protect, updateUserData)

module.exports = router