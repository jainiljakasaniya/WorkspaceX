const userService = require('./user.service');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const requestBody = req.body;
      await userService.registerUser(requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  loginAndTokenGeneration: async (req, res, next) => {
    try {
      const requestBody = req.body;
      const responseBody = await userService.loginAndTokenGeneration(requestBody);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  getBookingsByUserId: async (req, res, next) => {
    try {
      const { id } = req.user;
      const responseBody = await userService.getBookingsByUserId(id);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  getWishListByUserId: async (req, res, next) => {
    try {
      const { id } = req.user;
      const responseBody = await userService.getWishListByUserId(id);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  getNotificationsListByUserId: async (req, res, next) => {
    try {
      const { id } = req.user;
      const responseBody = await userService.getNotificationsListByUserId(id);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
};
