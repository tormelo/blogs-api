const { verifyToken } = require('../auth');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const payload = verifyToken(token);
  const { isInvalid } = payload;
  if (isInvalid) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  
  req.user = payload;

  return next();
};