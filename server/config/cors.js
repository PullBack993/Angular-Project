require("dotenv/config");
const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 3000,
    dbURL: process.env.DB_CONNECTION_STR,
    origin: ["http://localhost:5555", "http://localhost:4200"],
  },
  production: {
    port: process.env.PORT || 3000,
    dbURL: process.env.DB_URL_CREDENTIALS,
    origin: ["https://real-estate-angular-project.herokuapp.com"],
  },
};

module.exports = config[env];
