module.exports = {
  updateQuery: (column) => `${column.map((col, index) => `"${col}"=$${index + 1}`)}`,
};
