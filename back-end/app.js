const express = require('express');
const mysql = require('mysql');
const app = express();
const database = require('./config/database');
const mysqlConnection = mysql.createConnection(database.mysql);
const bodyParser = require('body-parser');

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('MySQL connection successful');
    } else {
        console.log(`MySQL connection failed \n Error: ${JSON.stringify(err)}`);
    }
});

module.exports = {mysqlConnection};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/registration').router);

app.listen('3000', () => {
    console.log('Server started on port 3000');
});