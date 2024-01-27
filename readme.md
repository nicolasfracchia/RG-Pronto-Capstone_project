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
```BASH
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

# 2 - MODELS AND MIGRATIONS
1. Create models and migrations with sequelize:
```BASH
# Sections
    sequelize model:generate --name Sections --attributes name:string
# ProductPrices
    sequelize model:generate --name ProductPrices --attributes productId:integer,concept:string,price:float,sectionId:integer
# Categories
    sequelize model:generate --name Categories --attributes name:string
# UserTyes
    sequelize model:generate --name UserTypes --attributes type:string
# OrdersStatus
    sequelize model:generate --name OrdersStatus --attributes name:string
# Users
    sequelize model:generate --name Users --attributes name:string,lastName:string,address:string,usertypesId:integer
# Products
    sequelize model:generate --name Products --attributes name:string,image:string,categoryId:integer,order:integer
# Orders (This one uses the automatic fields "CreatedAt" and "UpdatedAt")
    sequelize model:generate --name Orders --attributes userId:integer,statusId:integer
# OrdersProducts
    sequelize model:generate --name OrdersProducts --attributes orderId:integer,productId:integer,unitPrice:float,quantity:integer,discount:float
```
2. Update models to set fields "NOT_NULL" and "timestamps: false" on every model except Orders.
3. Update migrations generated with the models to remove timestamps (createdAt and updatedAt), except for Orders.
4. Run migrations to check status: ``` sequelize db:migrate ```
5. Create migrations to set foreign keys:
```BASH
# ProductPrices - Sections
	sequelize migration:generate --name FK-ProductPrices-Sections
# ProductPrices - Products
	sequelize migration:generate --name FK-ProductPrices-Products
# Products - Categories
	sequelize migration:generate --name FK-Products-Categories
# Users - UserTypes
	sequelize migration:generate --name FK-Users-UserTypes
# Orders - Users
	sequelize migration:generate --name FK-Orders-Users
# Orders - OrdersStatus
	sequelize migration:generate --name FK-Orders-OrdersStatus
# OrdersProducts - Orders
	sequelize migration:generate --name FK-OrdersProducts-Orders
# OrdersProducts - Products
	sequelize migration:generate --name FK-OrdersProducts-Products
```
5. Set foreign key:
```JavaScript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('TABLE_NAME', {
      fields: ['TABLE_FIELD'],
      type: 'foreign key',
      name: 'FK_NAME',
      references: {
        table: 'REFERENCED_TABLE_NAME',
        field: 'REFERENCED_TABLE_PK_FIELD',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('TABLE_NAME', 'FK_NAME');
  }
};
```
6. Run migrations to check status: ``` sequelize db:migrate ```