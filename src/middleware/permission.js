// eslint-disable-next-line consistent-return
const permission = (allowedRole) => (req, res, next) => {
  try {
    const role = req.user.userRole;
    if (!role) {
      return next(new Error('FORBIDDEN'));
    }
    if (!allowedRole || role === allowedRole) {
      return next();
    }
    return next(new Error('FORBIDDEN'));
  } catch (err) {
    next(new Error('UNAUTHORIZED'));
  }
};

module.exports = permission;
