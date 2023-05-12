const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbConnPool } = require('../../../config/db.config');
const { jwtSecretKey } = require('../../../config');
const userDAL = require('./user.dal');

const saltRounds = 12;

module.exports = {
  // To register a new user
  registerUser: async (reqBody) => {
    const dbClient = await dbConnPool.connect();
    try {
      const {
        userName, userEmail, userPassword, userRole
      } = reqBody;
      const passwordHash = await bcrypt.hash(userPassword, saltRounds);
      const values = [userName, userEmail, passwordHash, userRole];
      return userDAL.registerUser(dbClient, values);
    } finally {
      dbClient.release();
    }
  },
  // To authenticate user credentials and get the access token
  loginAndTokenGeneration: async (reqBody) => {
    const dbClient = await dbConnPool.connect();
    try {
      const { userPassword, userEmail } = reqBody;
      const user = await userDAL.loginUser(dbClient, userEmail);
      const result = await bcrypt.compare(userPassword, user.userPassword);
      if (!result) {
        throw new Error('NOT_FOUND');
      }
      const PAYLOAD = {
        ...user,
      };
      const token = jwt.sign(PAYLOAD, jwtSecretKey);
      return { token };
    } finally {
      dbClient.release();
    }
  },
  // get bookings of specific user
  getBookingsByUserId: async (userId) => {
    const dbClient = await dbConnPool.connect();
    try {
      return userDAL.getBookingsByUserId(dbClient, userId);
    } finally {
      dbClient.release();
    }
  },
  // get all wishlist  of specific user
  getWishListByUserId: async (userId) => {
    const dbClient = await dbConnPool.connect();
    try {
      return userDAL.getWishListByUserId(dbClient, userId);
    } finally {
      dbClient.release();
    }
  },
  // get all notification for specific user.
  getNotificationsListByUserId: async (userId) => {
    const dbClient = await dbConnPool.connect();
    try {
      return userDAL.getNotificationsListByUserId(dbClient, userId);
    } finally {
      dbClient.release();
    }
  }
};
