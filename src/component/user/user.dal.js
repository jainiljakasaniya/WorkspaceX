module.exports = {
  registerUser: async (dbClient, newUserObject) => {
    const sqlQuery = `
          INSERT
            INTO
            "user" ("userName",
            "userEmail",
            "userPassword",
            "userRole")
          VALUES ($1,$2,$3,$4)`;
    const queryResult = await dbClient.query(sqlQuery, newUserObject);
    return queryResult;
  },
  loginUser: async (dbClient, userEmail) => {
    const sqlQuery = `
          SELECT
            "id",
            "userName",
            "userEmail",
            "userPassword",
            "userRole"
          FROM
            "user"
          WHERE
            "userEmail" = $1`;
    const parameters = [userEmail];
    const userDetails = await dbClient.query(sqlQuery, parameters);
    if (userDetails.rowCount === 0) {
      throw new Error('NOT_FOUND');
    }
    return userDetails.rows[0];
  },
  getBookingsByUserId: async (dbClient, userId) => {
    const sqlQuery = `
      SELECT
        "id",
        "userId",
        "roomId",
        "bookingStart",
        "bookingEnd",
        "purpose"
      FROM
        "booking"
      WHERE 
        "userId" = $1`;
    const parameters = [userId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
  getWishListByUserId: async (dbClient, userId) => {
    const sqlQuery = `
      SELECT
        "id",
        "userId",
        "roomId"
      FROM
        "wishList"
      WHERE 
        "userId" = $1`;
    const parameters = [userId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
  getNotificationsListByUserId: async (dbClient, userId) => {
    const sqlQuery = `
    SELECT
      wl."id",
      "wishListId",
      "createdAt",
      "detail",
      n."id",
      "userId",
      "roomId"
    FROM
      notification n
    JOIN "wishList" wl ON n."wishListId" = wl.id
    WHERE wl."userId" = $1`;
    const parameters = [userId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  }
};
