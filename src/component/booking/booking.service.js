const { dbConnPool } = require('../../../config/db.config');
const bookingDAL = require('./booking.dal');

module.exports = {
  // get all bookings
  getAllBooking: async () => {
    const dbClient = await dbConnPool.connect();
    try {
      return bookingDAL.getAllBooking(dbClient);
    } finally {
      dbClient.release();
    }
  },
  // add a new booking
  createBooking: async (userId, reqBody) => {
    const dbClient = await dbConnPool.connect();
    try {
      const {
        roomid, bookingStart, bookingEnd
      } = reqBody;
      if (await bookingDAL.getExistingSlotBooking(dbClient, roomid, bookingStart, bookingEnd)) {
        throw new Error('CONFLICT');
      }
      return bookingDAL.createBooking(dbClient, userId, reqBody);
    } finally {
      dbClient.release();
    }
  },
  // update booking
  updateBookingById: async (bookingId, reqBody) => {
    const dbClient = await dbConnPool.connect();
    try {
      const {
        roomid, bookingStart, bookingEnd
      } = reqBody;
      if (await bookingDAL.getExistingSlotBooking(dbClient, roomid, bookingStart, bookingEnd)) {
        throw new Error('CONFLICT');
      }
      return bookingDAL.updateBookingById(dbClient, bookingId, reqBody);
    } finally {
      dbClient.release();
    }
  },
  // delete booking
  deleteBookingById: async (bookingId) => {
    const dbClient = await dbConnPool.connect();
    try {
      return bookingDAL.deleteBookingById(dbClient, bookingId);
    } finally {
      dbClient.release();
    }
  },
};
