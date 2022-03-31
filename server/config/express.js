const express = require("express");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const { authJwt } = require("../helpers/guards");
const errorHandler = require("../helpers/error-handler");

module.exports = (app) => {
  app.use("*", cors());
  app.use(express.json());
  app.use(cookiParser());
  app.use(authJwt());
  app.use(errorHandler);
};
