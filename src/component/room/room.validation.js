const Joi = require('joi');

module.exports = {
  getRoomById: {
    params: Joi.object({
      roomId: Joi.number().required(),
    })
  },
  createRoom: {
    body: Joi.object({
      name: Joi.string().required(),
      floor: Joi.number().required(),
      capacity: Joi.number().required(),
    })
  },
  updateRoomById: {
    params: Joi.object({
      roomId: Joi.number().required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      floor: Joi.number(),
      capacity: Joi.number(),
    })
  },
  deleteRoomById: {
    params: Joi.object({
      roomId: Joi.number().required(),
    })
  },
  getBookingsByRoomId: {
    params: Joi.object({
      roomId: Joi.number().required(),
    })
  }
};
