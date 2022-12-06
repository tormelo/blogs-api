const { verifyToken } = require('../auth');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const { isInvalid } = verifyToken(token);
  if (isInvalid) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  
  return next();
};