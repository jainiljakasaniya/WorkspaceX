const express = require('express');
const bookingController = require('./booking.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./booking.validation');
const auth = require('../../middleware/auth');
const permission = require('../../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /booking:
 *   get:
 *     tags:
 *       - booking
 *     summary: To get list of all bookings.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/booking/res.json#GetAllBooking'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   post:
 *     tags:
 *       - booking
 *     summary: To create or add new booking.
 *     parameters:
 *       - in: body
 *         name: booking
 *         description: booking data
 *         schema:
 *           $ref: 'components/booking/req.json#CreateBooking'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/')
  .get(
    auth,
    permission(),
    bookingController.getAllBooking
  )
  .post(
    auth,
    permission(),
    validate(validation.createBooking),
    bookingController.createBooking
  );

/**
 * @swagger
 * /booking/{bookingId}:
 *   put:
 *     tags:
 *       - booking
 *     summary: To update details of specific booking
 *     parameters:
 *       - in: path
 *         required: true
 *         name: bookingId
 *         type: integer
 *       - in: body
 *         name: booking
 *         description: booking data
 *         schema:
 *           $ref: 'components/booking/req.json#CreateBooking'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   delete:
 *     tags:
 *       - booking
 *     summary: To delete specific booking
 *     parameters:
 *       - in: path
 *         required: true
 *         name: bookingId
 *         type: integer
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       401:
 *         description: unauthorized access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       403:
 *         description: forbidden access.
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/:bookingId')
  .put(
    auth,
    permission(),
    validate(validation.updateBookingById),
    bookingController.updateBookingById
  )
  .delete(
    auth,
    permission(),
    validate(validation.deleteBookingById),
    bookingController.deleteBookingById
  );

module.exports = router;
