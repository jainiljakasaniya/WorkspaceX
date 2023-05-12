const Joi = require('joi');

module.exports = {
  addWishList: {
    body: Joi.object({
      userid: Joi.number().required(),
      roomid: Joi.number().required(),
    })
  },
  deleteWishList: {
    params: Joi.object({
      wishListId: Joi.number().required()
    })
  }
};
