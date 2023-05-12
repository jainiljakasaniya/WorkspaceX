const wishListService = require('./wishlist.service');

module.exports = {
  addWishList: async (req, res, next) => {
    try {
      const requestBody = req.body;
      await wishListService.addWishList(requestBody);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
  deleteWishList: async (req, res, next) => {
    try {
      const { wishListId } = req.params;
      await wishListService.deleteWishList(wishListId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
};
