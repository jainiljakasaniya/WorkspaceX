const express = require('express');
const userController = require('./user.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./user.validation');
const auth = require('../../middleware/auth');
const permission = require('../../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - user
 *     summary: To register new user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: user data
 *         schema:
 *           $ref: 'components/user/req.json#RegisterUser'
 *     responses:
 *       204:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/register')
  .post(
    validate(validation.registerUser),
    userController.registerUser
  );

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - user
 *     summary: To login user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: user data
 *         schema:
 *           $ref: 'components/user/req.json#LoginAndTokenGeneration'
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/user/res.json#LoginAndTokenGeneration'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/login')
  .post(
    validate(validation.loginAndTokenGeneration),
    userController.loginAndTokenGeneration
  );

/**
 * @swagger
 * /user/booking:
 *   get:
 *     tags:
 *       - user
 *     summary: To get all bookings of login user.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/user/res.json#GetBookingsByUserId'
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
router.route('/booking')
  .get(
    auth,
    permission(),
    userController.getBookingsByUserId
  );

/**
 * @swagger
 * /user/wishList:
 *   get:
 *     tags:
 *       - user
 *     summary: To get all wishlist of login user.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/user/res.json#GetWishListByUserId'
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
router.route('/wishList')
  .get(
    auth,
    permission(),
    userController.getWishListByUserId
  );

/**
 * @swagger
 * /user/notifications:
 *   get:
 *     tags:
 *       - user
 *     summary: To get all notifications of login user.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/user/res.json#GetNotificationsListByUserId'
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
router.route('/notifications')
  .get(
    auth,
    permission(),
    userController.getNotificationsListByUserId
  );

module.exports = router;
