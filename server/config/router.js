const authController = require('../controllers/auth');
const homePageController = require('../controllers/homePage');
const homeController = require('../controllers/home');
const router = require("express").Router();
require('dotenv/config');

const api = process.env.API_URL;

module.exports = (app) => {
    app.use('/',  router.get("/", async (req, res) => {
      res.status(200).send("HELLO SOFTUNI");
    }))
    app.use(`${api}`, authController);
    app.use(`${api}`,homeController);
    app.use(`${api}/home`,homePageController);
};