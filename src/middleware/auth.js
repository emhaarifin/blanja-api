/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const helper = require("../helper/response");

module.exports = {
  verifyAccess: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("server need token");
      error.code = 401;
      return next(error);
    }
    const result = token.split(" ")[1];
    console.log(result);
    jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const error = new Error("token expired");
          error.status = 401;
          return next(error);
        } else if (err.name === "JsonWebTokenError") {
          const error = new Error("token invalid");
          error.status = 401;
          return next(error);
        } else {
          const error = new Error("token not active");
          error.status = 401;
          return next(error);
        }
      }
      req.token = token;
      req.id = decoded.id;
      req.roles = decoded.roles;
      next();
    });
  },
  custommer: (req, res, next) => {
    const roles = req.roles;
    if (roles === "custommer") {
      return next();
    }
    return helper.response(res, "Forbidden Access", 403);
  },
  seller: (req, res, next) => {
    const status = req.status;
    const roles = req.roles;
    if ((roles === "seller") & (status === "active")) {
      return next();
    } else if (roles !== "seller") {
      return helper.response(res, "Forbidden Access", 403);
    }

    return helper.response(res, "Activasi Email", 403);
  },
};
