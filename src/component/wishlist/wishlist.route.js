const express = require('express');
const wishListController = require('./wishlist.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./wishlist.validation');
const auth = require('../../middleware/auth');
const permission = require('../../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /wishList:
 *   post:
 *     tags:
 *       - wishList
 *     summary: To create wishlist of login user.
 *     parameters:
 *       - in: body
 *         name: booking
 *         description: wishlist data
 *         schema:
 *           $ref: 'components/wishList/req.json#AddWishList'
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
  .post(
    auth,
    permission(),
    validate(validation.addWishList),
    wishListController.addWishList
  );

/**
 * @swagger
 * /wishList:
 *   delete:
 *     tags:
 *       - wishList
 *     summary: To delete wishlist.
 *     parameters:
 *       - in: path
 *         name: wishListId
 *         description: wishlist id
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
router.route('/:wishListId')
  .delete(
    auth,
    permission(),
    validate(validation.deleteWishList),
    wishListController.deleteWishList
  );

module.exports = router;
