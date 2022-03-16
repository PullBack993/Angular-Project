require('dotenv/config');
const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routerConfig = require('./config/router');

start()
async function start() {
    
    const app = express();
    expressConfig(app);
    await databaseConfig(app);
    routerConfig(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`App start in port 3000 ==> http://localhost:3000`));
};