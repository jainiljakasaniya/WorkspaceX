const { dbConnPool } = require('../../../config/db.config');
const roomDAL = require('./room.dal');

module.exports = {
  // get all list of room
  getAllRoom: async () => {
    const dbClient = await dbConnPool.connect();
    try {
      return roomDAL.getAllRoom(dbClient);
    } finally {
      dbClient.release();
    }
  },
  // get specific room details by id
  getRoomById: async (roomId) => {
    const dbClient = await dbConnPool.connect();
    try {
      return roomDAL.getRoomById(dbClient, roomId);
    } finally {
      dbClient.release();
    }
  },
  // add a new room
  createRoom: async (reqBody) => {
    const dbClient = await dbConnPool.connect();
    try {
      return roomDAL.createRoom(dbClient, reqBody);
    } finally {
      dbClient.release();
    }
  },
  // update room details
  updateRoomById: async (roomId, reqBody) => {
    const dbClient = await dbConnPool.connect();
    try {
      return roomDAL.updateRoomById(dbClient, roomId, reqBody);
    } finally {
      dbClient.release();
    }
  },
  // delete room
  deleteRoomById: async (roomId) => {
    const dbClient = await dbConnPool.connect();
    try {
      return roomDAL.deleteRoomById(dbClient, roomId);
    } finally {
      dbClient.release();
    }
  },
  // get specific booking details by roomid
  getBookingsByRoomId: async (roomId) => {
    const dbClient = await dbConnPool.connect();
    try {
      return roomDAL.getBookingsByRoomId(dbClient, roomId);
    } finally {
      dbClient.release();
    }
  },
};
