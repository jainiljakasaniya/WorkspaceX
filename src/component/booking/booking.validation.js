const Joi = require('joi');

module.exports = {
  createBooking: {
    body: Joi.object({
      userid: Joi.number().required(),
      roomid: Joi.number().required(),
      bookingStart: Joi.string().required(),
      bookingEnd: Joi.string().required(),
      purpose: Joi.string().required(),
    })
  },
  updateBookingById: {
    params: Joi.object({
      bookingId: Joi.number().required(),
    }),
    body: Joi.object({
      userid: Joi.number().required(),
      roomid: Joi.number().required(),
      bookingStart: Joi.string().required(),
      bookingEnd: Joi.string().required(),
      purpose: Joi.string(),
    })
  },
  deleteBookingById: {
    params: Joi.object({
      bookingId: Joi.number().required(),
    })
  },
};
