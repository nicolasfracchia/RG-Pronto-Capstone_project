require('dotenv').config();

const database = require('./config/database');
const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require('./routes');

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* - - - - - ROUTES - - - - - */

app.get('/', (req, res) => {
    res.send('WORKS!');
});

app.use('/users', routes.userRoutes);
app.use('/categories', routes.categoriesRoutes);
app.use('/ordersstatus', routes.ordersStatusRoutes);
app.use('/userstypes', routes.userTypesRoutes);