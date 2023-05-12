const Joi = require('joi');

module.exports = {
  registerUser: {
    body: Joi.object({
      userName: Joi.string().required(),
      userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
      userPassword: Joi.string().required(),
      userRole: Joi.string().valid('Admin', 'Employee').required(),
    })
  },
  loginAndTokenGeneration: {
    body: Joi.object({
      userEmail: Joi.string().email({ tlds: { allow: false } }).required(),
      userPassword: Joi.string().required(),
    })
  },
};
