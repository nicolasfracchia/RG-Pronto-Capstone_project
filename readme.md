# 1 - SET-UP
1. Installation commands
```BASH
npm init
npm install express sequelize sequelize-cli
npx sequelize init
npm install mariadb
npm install dotenv #To handle credentials through a .env file
```
2. Create .env file with port and database credentials:
```batch
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_DIALECT=
PORT=
```
3. Create file config/database.js to handle connection with Sequelize:
```JavaScript
const Sequelize = require("sequelize");

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbDialect = process.env.DB_DIALECT || 'mariadb';

const database = new Sequelize(dbDatabase, dbUser, dbPassword, {dialect:dbDialect,host:dbHost});

module.exports = database;
```
4. Create index.js file with minimuim information
```JavaScript
require('dotenv').config();

const database = require('./config/database');
const express = require('express');
const app = express();
const port = process.env.PORT;

database.authenticate()
    .then(function () {
        console.log('DB CONNECTED SUCCESSFULLY');
    })
    .catch(function (error) {
        console.log('DATABASE CONNECTION ERROR:', error);
    });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.send('WORKS!');
});
```
5. Test application running: ``` node index ```. 
 - Should log: "DB CONNECTED SUCCESSFULLY" and "Server running on port: ".  
 - Route GET ``` / ``` should show the message "WORKS!".
6. Create file ".sequelizerc.js" to load configuration for Sequelize CLI
```JavaScript
// .sequelizerc.js

module.exports = {
    config: "config/config.js"
};
```
7. Change file "config/config.json" to "config/config.js" to allow using environment variables
```JavaScript
// config/config.js

require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
  }
  ...
};
```