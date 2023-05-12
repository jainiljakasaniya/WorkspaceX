const express = require('express');
const roomController = require('./room.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./room.validation');
const auth = require('../../middleware/auth');
const permission = require('../../middleware/permission');

const router = express.Router();

/**
 * @swagger
 * /room:
 *   get:
 *     tags:
 *       - room
 *     summary: To get list of all rooms.
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/room/res.json#GetAllRoom'
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
 *       - room
 *     summary: To create or add new room.
 *     parameters:
 *       - in: body
 *         name: room
 *         description: room data
 *         schema:
 *           $ref: 'components/room/req.json#CreateRoom'
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
    roomController.getAllRoom
  )
  .post(
    auth,
    permission('Admin'),
    validate(validation.createRoom),
    roomController.createRoom
  );

/**
 * @swagger
 * /room/{roomId}:
 *   get:
 *     tags:
 *       - room
 *     summary: To get details of specific room
 *     parameters:
 *       - in: path
 *         required: true
 *         name: roomId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/room/res.json#GetRoomById'
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
 *   put:
 *     tags:
 *       - room
 *     summary: To update details of specific room
 *     parameters:
 *       - in: path
 *         required: true
 *         name: roomId
 *         type: integer
 *       - in: body
 *         name: room
 *         description: room data
 *         schema:
 *           $ref: 'components/room/req.json#CreateRoom'
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
 *       - room
 *     summary: To delete specific room
 *     parameters:
 *       - in: path
 *         required: true
 *         name: roomId
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
router.route('/:roomId')
  .get(
    auth,
    permission(),
    validate(validation.getRoomById),
    roomController.getRoomById
  )
  .put(
    auth,
    permission('Admin'),
    validate(validation.updateRoomById),
    roomController.updateRoomById
  )
  .delete(
    auth,
    permission('Admin'),
    validate(validation.deleteRoomById),
    roomController.deleteRoomById
  );

/**
 * @swagger
 * /room/{roomId}/booking:
 *   get:
 *     tags:
 *       - room
 *     summary: To get all bookings of specific room
 *     parameters:
 *       - in: path
 *         required: true
 *         name: roomId
 *         type: integer
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/room/res.json#GetBookingsByRoomId'
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
router.route('/:roomId/booking')
  .get(
    auth,
    permission(),
    validate(validation.getBookingsByRoomId),
    roomController.getBookingsByRoomId
  );

module.exports = router;
