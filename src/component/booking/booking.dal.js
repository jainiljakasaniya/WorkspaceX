const dalhelper = require('../../helper/dalHelper');

module.exports = {
  getAllBooking: async (dbClient) => {
    const sqlQuery = `
      SELECT
        "id",
        "userid",
        "roomid",
        "bookingStart",
        "bookingEnd",
        "purpose"
      FROM
        "booking"`;
    const queryResult = await dbClient.query(sqlQuery);
    return queryResult.rows;
  },
  getExistingSlotBooking: async (dbClient, roomId, bookingStartDate, bookingEndDate) => {
    const sqlQuery = `
      SELECT
        "id"
      FROM
        "booking"
      WHERE 
          ($1 < "bookingEnd" AND $2 > "bookingStart") 
          AND "roomid" = $3`;
    const parameters = [bookingStartDate, bookingEndDate, roomId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rowCount;
  },
  createBooking: async (dbClient, userId, newBooking) => {
    const {
      roomid, bookingStart, bookingEnd, purpose
    } = newBooking;
    const sqlQuery = `
    INSERT
    INTO
      "booking" (
        "userid",
        "roomid",
        "bookingStart",
        "bookingEnd",
        "purpose"
      ) 
    VALUES($1, $2, $3, $4, $5)`;
    const parameters = [userId, roomid, bookingStart, bookingEnd, purpose];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows;
  },
  updateBookingById: async (dbClient, bookingId, newBooking) => {
    const columns = Object.keys(newBooking);
    const parameters = [...Object.values(newBooking), bookingId];
    const sqlQuery = `
      UPDATE
        "booking"
      SET
        ${dalhelper.updateQuery(columns)}
      WHERE
        "id" = $${columns.length + 1}`;
    const queryResult = await dbClient.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult.rows;
  },
  deleteBookingById: async (dbClient, bookingId) => {
    const sqlQuery = `
    DELETE
    FROM
      "booking"
    WHERE
      "id" = $1`;
    const parameters = [bookingId];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    if (!queryResult.rowCount) {
      throw new Error('NOT_FOUND');
    }
    return queryResult.rows;
  },
};
