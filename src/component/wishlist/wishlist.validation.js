const Joi = require('joi');

module.exports = {
  addWishList: {
    body: Joi.object({
      roomId: Joi.number().required(),
    })
  },
  deleteWishList: {
    params: Joi.object({
      wishListId: Joi.number().required()
    })
  }
};
