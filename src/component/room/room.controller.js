const roomService = require('./room.service');

module.exports = {
  getAllRoom: async (req, res, next) => {
    try {
      const responseBody = await roomService.getAllRoom();
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  getRoomById: async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const responseBody = await roomService.getRoomById(roomId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  createRoom: async (req, res, next) => {
    try {
      const requestBody = req.body;
      await roomService.createRoom(requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  updateRoomById: async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const requestBody = req.body;
      await roomService.updateRoomById(roomId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteRoomById: async (req, res, next) => {
    try {
      const { roomId } = req.params;
      await roomService.deleteRoomById(roomId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  getBookingsByRoomId: async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const responseBody = await roomService.getBookingsByRoomId(roomId);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};
