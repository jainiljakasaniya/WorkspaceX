const generateNotificationParameters = (occupiedRoomId, wishlist) => {
  const notificationParameters = [];
  const parameterValues = [];
  let count = 1;
  wishlist.forEach(wish => {
    if (!occupiedRoomId.includes(wish.roomid)) {
      const parameterizedString = `
     (
      $${count},
      $${count + 1},
      $${count + 2}
     )`;
      notificationParameters.push(parameterizedString);
      parameterValues.push(wish.id);
      parameterValues.push(new Date().toISOString());
      parameterValues.push(`Room ${wish.roomid} is now available.`);
      count += 3;
    }
  });
  const strParameterNames = notificationParameters.join();
  return { strParameterNames, parameterValues };
};

module.exports = {
  addWishList: async (dbClient, userid, roomid) => {
    const sqlQuery = `
    INSERT
    INTO
      "wishList" (userid, roomid)
    VALUES($1, $2);
    `;
    const parameters = [userid, roomid];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  },
  deleteWishList: async (dbClient, wishListid) => {
    const sqlQuery = `
    DELETE
    FROM
      "wishList"
    WHERE
      id = $1
    `;
    const parameters = [wishListid];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  },
  deleteReferenceNotification: async (dbClient, wishListId) => {
    const sqlQuery = `
    DELETE
    FROM
       notification
    WHERE
    "wishListid" = $1
    `;
    const parameters = [wishListId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  },
  checkOccupancy: async (dbClient, currentDate) => {
    const sqlQuery = `
    SELECT
      w.roomid
    FROM
      "wishList" w
    LEFT JOIN "booking" b ON
      w.roomid = b.roomid
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
        id,
        userid,
        roomid
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
        "notification" ("wishListid", createdat, detail)
      VALUES ${strParameterNames}
      `;
    const queryResult = await dbClient.query(sqlQuery, parameterValues);
    return queryResult;
  },
  cleanupNotification: async (dbClient, dateBeforeMonth) => {
    const sqlQuery = `
    DELETE
    FROM
      notification
    WHERE
      createdat < $1;   
    `;
    const parameters = [dateBeforeMonth];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult;
  }
};
