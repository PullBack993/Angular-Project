// const config = require('./cors')
const express = require("express");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const { authJwt } = require("../helpers/guards");
const errorHandler = require("../helpers/error-handler");
// const cors = require("./cors")

module.exports = (app) => {
  app.use("*", cors());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(express.json());
  app.use(cookiParser());
  app.use(authJwt());
  app.use(errorHandler);
};
