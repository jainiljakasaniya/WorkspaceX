const bookingService = require('./booking.service');

module.exports = {
  getAllBooking: async (req, res, next) => {
    try {
      const responseBody = await bookingService.getAllBooking();
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  createBooking: async (req, res, next) => {
    try {
      const requestBody = req.body;
      await bookingService.createBooking(requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  updateBookingById: async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      const requestBody = req.body;
      await bookingService.updateBookingById(bookingId, requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteBookingById: async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      await bookingService.deleteBookingById(bookingId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};
