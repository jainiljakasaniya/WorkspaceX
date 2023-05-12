const express = require('express');

const userRoute = require('./user/user.route');
const roomRoute = require('./room/room.route');
const bookingRoute = require('./booking/booking.route');
const wishlistRoute = require('./wishlist/wishlist.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/room', roomRoute);
router.use('/booking', bookingRoute);
router.use('/wishlist', wishlistRoute);

module.exports = router;
