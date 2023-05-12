module.exports = {
  PostgresDbErrorCode: {
    FOREIGN_KEY_VIOLATION: '23503',
    UNIQUE_VIOLATION: '23505'
  },
  cronJobTime: {
    // every 1 minute
    notificationTime: '* * * * *',
    // At 12:00
    cleanupTime: '0 12 * * *'
  }
};
