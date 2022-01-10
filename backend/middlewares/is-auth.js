const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {

  // checking if the request's header has the authorization
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // checking if the request's header has a token
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  // checking if the token is successfully decoded
  let decodedToken;
  try {
    decodedToken = jwt.decode(token, `${process.env.BCRYPT_PRIVATE_KEY}`);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  // Checking if the decoded token is valid
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // we are returning setting the "isAuth" to true is everything is fine
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
