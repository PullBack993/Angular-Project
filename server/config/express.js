const cors = require('./cors');
const express = require('express');
const cookiParser = require('cookie-parser')
const { authJwt } = require('../helpers/guards');
const errorHandler = require("../helpers/error-handler");

module.exports = (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(cookiParser());
    app.use(authJwt());
    app.use(errorHandler);
    
};

