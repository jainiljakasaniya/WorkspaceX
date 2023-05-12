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
        "userid",
        "roomid",
        "bookingStart",
        "bookingEnd",
        "purpose"
      FROM
        "booking"
      WHERE 
        "userid" = $1`;
    const parameters = [userId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
  getWishListByUserId: async (dbClient, userId) => {
    const sqlQuery = `
      SELECT
        "id",
        "userid",
        "roomid"
      FROM
        "wishList"
      WHERE 
        "userid" = $1`;
    const parameters = [userId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
  getNotificationsListByUserId: async (dbClient, userId) => {
    const sqlQuery = `
    SELECT
      wl.id,
      "wishListid",
      createdat,
      detail,
      n.id,
      userid,
      roomid
    FROM
      notification n
    JOIN "wishList" wl ON n."wishListid" = wl.id
    WHERE wl.userid = $1`;
    const parameters = [userId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  }
};
