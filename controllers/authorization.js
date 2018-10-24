const redis = require('./signIn').redisClient();

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  
  return next();
}
