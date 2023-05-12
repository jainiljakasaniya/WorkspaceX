const dalHelper = require('../../helper/dalHelper');

module.exports = {
  getAllRoom: async (dbClient) => {
    const sqlQuery = `
      SELECT
        "id",
        "name",
        "floor",
        "capacity"
      FROM
        "room"`;
    const queryResult = await dbClient.query(sqlQuery);
    return queryResult.rows;
  },
  getRoomById: async (dbClient, roomId) => {
    const sqlQuery = `
      SELECT
        "id",
        "name",
        "floor",
        "capacity"
      FROM
        "room"
      WHERE "id" = $1`;
    const parameters = [roomId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult.rows[0];
  },
  createRoom: async (dbClient, newRook) => {
    const sqlQuery = `
      INSERT
          INTO
          "room" ("name",
          "floor",
          "capacity")
      VALUES ($1,$2,$3)`;
    const { name, floor, capacity } = newRook;
    const parameters = [name, floor, capacity];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
  updateRoomById: async (dbClient, roomId, newRookData) => {
    const columns = Object.keys(newRookData);
    const parameters = [...Object.values(newRookData), roomId];
    const sqlQuery = `
      UPDATE
        "room"
      SET
        ${dalHelper.updateQuery(columns)}
      WHERE
        "id" = $${columns.length + 1}`;
    const queryResult = await dbClient.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult.rows;
  },
  deleteRoomById: async (dbClient, roomId) => {
    const sqlQuery = `
    DELETE
    FROM
      "room"
    WHERE
      "id" = $1`;
    const parameters = [roomId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult.rows;
  },
  getBookingsByRoomId: async (dbClient, roomId) => {
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
        "roomId" = $1`;
    const parameters = [roomId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
};
