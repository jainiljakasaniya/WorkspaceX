module.exports = {
  getDateBeforeDays: (date, day) => {
    const startDate = new Date(date);
    return new Date(startDate.setDate(startDate.getDate() - day));
  },
};
