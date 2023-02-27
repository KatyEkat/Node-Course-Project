const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PATCH, DELETE, PUT");
  next();
};

module.exports = cors;
