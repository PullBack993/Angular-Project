const authController = require('../controllers/auth');
const homePageController = require('../controllers/homePage');
const homeController = require('../controllers/home');
require('dotenv/config');

const api = process.env.API_URL;

module.exports = (app) => {
    app.use(`${api}`, authController);
    app.use(`${api}`,homeController);
    app.use(`${api}/home`,homePageController);
};