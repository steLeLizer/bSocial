const express = require('express');
const mysql = require('mysql');
const app = express();
const database = require('./config/database');
const mysqlConnection = mysql.createConnection(database.mysql);
const bodyParser = require('body-parser');
const login = require('./routes/login');

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

// Routes
// Registration - /register
// Login authentication - /login
app.use('/', validatePayloadMiddleware, [require('./routes/registration').router, login.router]);

// Middleware
// Check if payload (request data content) is present
function validatePayloadMiddleware(req, res, next) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(403).send({message: 'Access denied, you need a payload!'});
    } else {
        next();
    }
}

// Format of a token:
// Authorization: Bearer <access_token>
function verifyTokenMiddleware(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space (Bearer <access_token>)
        const bearer = bearerHeader.split(' ');
        // Set the token
        req.token = bearer[1];
        // Next middleware
        login.jwt.verify(req.token, login.secret, (err, authData) => {
            if (err) {
                res.status(403).json({message: "Access denied!"});
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({message: "Access denied!"});
    }
}

app.listen('3000', () => {
    console.log('Server started on port 3000');
});