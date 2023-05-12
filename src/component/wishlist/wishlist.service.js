const { dbConnPool } = require('../../../config/db.config');
const wishlistDAL = require('./wishlist.dal');
const dateHelper = require('../../helper/dateHelper');

module.exports = {
  // To add a room in wishList.
  addWishList: async (userId, reqBody) => {
    const dbClient = await dbConnPool.connect();
    try {
      const { roomid } = reqBody;
      return wishlistDAL.addWishList(dbClient, userId, roomid);
    } finally {
      dbClient.release();
    }
  },
  // To delete a room in wishList.
  deleteWishList: async (wishListId) => {
    const dbClient = await dbConnPool.connect();
    try {
      await wishlistDAL.deleteReferenceNotification(dbClient, wishListId);
      return wishlistDAL.deleteWishList(dbClient, wishListId);
    } finally {
      dbClient.release();
    }
  },
  // send notification for room availability
  sendNotification: async () => {
    const dbClient = await dbConnPool.connect();
    try {
      const occupiedRoom = await wishlistDAL.checkOccupancy(dbClient, new Date().toISOString());
      const occupiedRoomId = [];
      occupiedRoom.forEach(room => {
        occupiedRoomId.push(room.roomid);
      });
      const wishlist = await wishlistDAL.getWishList(dbClient);
      await wishlistDAL.addNotification(dbClient, occupiedRoomId, wishlist);
    } finally {
      dbClient.release();
    }
  },
  // clean notifications before one month
  cleanupNotification: async () => {
    const dbClient = await dbConnPool.connect();
    try {
      const dateBeforeMonth = dateHelper.getDateBeforeDays(new Date(), 30);
      return wishlistDAL.cleanupNotification(dbClient, dateBeforeMonth);
    } finally {
      dbClient.release();
    }
  },
};
