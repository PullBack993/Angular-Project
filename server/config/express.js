// const config = require('./cors')
const express = require("express");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const { authJwt } = require("../helpers/guards");
const errorHandler = require("../helpers/error-handler");
// const cors = require("./cors")

module.exports = (app) => {
  // app.use(cors());
  // origin: config.origin,
  // credentials: true,
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Credentials', true);
      return res.status(200).json({});
    }
    next();
  })
  app.use(express.json());
   

  app.use(cookiParser());
  app.use(authJwt());
  app.use(errorHandler);
};
