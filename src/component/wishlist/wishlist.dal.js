const generateNotificationParameters = (occupiedRoomId, wishlist) => {
  const notificationParameters = [];
  const parameterValues = [];
  let count = 1;
  wishlist.forEach(wish => {
    if (!occupiedRoomId.includes(wish.roomId)) {
      const parameterizedString = `
     (
      $${count},
      $${count + 1},
      $${count + 2}
     )`;
      notificationParameters.push(parameterizedString);
      parameterValues.push(wish.id);
      parameterValues.push(new Date().toISOString());
      parameterValues.push(`Room ${wish.roomId} is now available.`);
      count += 3;
    }
  });
  const strParameterNames = notificationParameters.join();
  return { strParameterNames, parameterValues };
};

module.exports = {
  addWishList: async (dbClient, userId, roomId) => {
    const sqlQuery = `
    INSERT
    INTO
      "wishList" ("userId", "roomId")
    VALUES($1, $2);
    `;
    const parameters = [userId, roomId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  },
  deleteWishList: async (dbClient, wishListId) => {
    const sqlQuery = `
    DELETE
    FROM
      "wishList"
    WHERE
      "id" = $1
    `;
    const parameters = [wishListId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  },
  deleteReferenceNotification: async (dbClient, wishListId) => {
    const sqlQuery = `
    DELETE
    FROM
       notification
    WHERE
    "wishListId" = $1
    `;
    const parameters = [wishListId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  },
  checkOccupancy: async (dbClient, currentDate) => {
    const sqlQuery = `
    SELECT
      w."roomId"
    FROM
      "wishList" w
    LEFT JOIN "booking" b ON
      w."roomId" = b."roomId"
    WHERE
      ($1 BETWEEN "bookingStart" AND "bookingEnd")
     `;
    const parameters = [currentDate];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
  getWishList: async (dbClient) => {
    const sqlQuery = `
      SELECT
        "id",
        "userId",
        "roomId"
      FROM
        "wishList"
     `;
    const queryResult = await dbClient.query(sqlQuery);
    return queryResult.rows;
  },
  addNotification: async (dbClient, occupiedRoomId, wishlist) => {
    const {
      strParameterNames,
      parameterValues
    } = generateNotificationParameters(occupiedRoomId, wishlist);
    const sqlQuery = `
      INSERT
      INTO
        "notification" ("wishListId", "createdAt", "detail")
      VALUES ${strParameterNames}
      `;
    const queryResult = await dbClient.query(sqlQuery, parameterValues);
    return queryResult;
  },
  cleanupNotification: async (dbClient, dateBeforeMonth) => {
    const sqlQuery = `
    DELETE
    FROM
      "notification"
    WHERE
      "createdAt" < $1;   
    `;
    const parameters = [dateBeforeMonth];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  }
};
