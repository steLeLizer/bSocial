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

const login = require('./routes/login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
// Registration - /register
// Login authentication - /login
app.use('/authentication', validatePayloadMiddleware, [require('./routes/registration').router, login.router]);

app.use('/validation', verifyRefreshTokenMiddleware, require('./routes/refreshToken').router);

app.use('/api', verifyAccessTokenMiddleware, [require('./routes/feed').router]);

// Middleware functions
// Check if payload (request data content) is present
function validatePayloadMiddleware(req, res, next) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(403).send({message: 'Access denied, you need a payload!'});
    } else {
        next();
    }
}

// Format of a token header:
// Authorization: Bearer <access_token>
function verifyAccessTokenMiddleware(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];

        login.jwt.verify(req.token, login.accessTokenSecret, (err) => {
            if (err) {
                console.log('aaa');
                res.status(403).json({message: "Access denied!"});
            } else {
                next();
            }
        });
    } else {
        console.log('bbb');
        res.status(403).json({message: "Access denied!"});
    }
}

function verifyRefreshTokenMiddleware(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];

        login.jwt.verify(req.token, login.refreshTokenSecret, (err) => {
            if (err) {
                console.log('ccc');
                res.status(403).json({message: "Access denied!"});
            } else {
                next();
            }
        });
    } else {
        console.log('ddd');
        res.status(403).json({message: "Access denied!"});
    }
}

app.listen('3000', () => {
    console.log('Server started on port 3000');
});