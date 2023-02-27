const logMethodMiddleware = (req, res, next) => {
  console.log(req.originalUrl);
  next();
};

module.exports = logMethodMiddleware;
