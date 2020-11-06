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
app.use('/authentication', validatePayloadMiddleware, [
    require('./routes/registration').router,
    login.router
]);

app.use('/validation', verifyRefreshTokenMiddleware, require('./routes/refreshToken').router);

app.use('/api', verifyAccessTokenMiddleware, [
    require('./routes/feed').router,
    require('./routes/profile').router,
    require('./routes/notifications').router
]);

app.use('/micro-service', verifyMicroserviceMiddleware, [require('./micro-services-endpoint/notifications').router]);

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

        login.jwt.verify(req.token, login.accessTokenSecret, (err, authData) => {
            if (err) {
                res.status(403).json({message: "Access denied!"});
            } else {
                // In case someone tries to access certain api endpoint with a different user id,
                // I am checking if the JWT is assigned to the correct user
                if (authData.user[0].id !== req.body.userId) {
                    return res.status(403).json({message: "Access denied, wrong user!"});
                }
                next();
            }
        });
    } else {
        res.status(403).json({message: "Access denied!"});
    }
}

function verifyRefreshTokenMiddleware(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];

        login.jwt.verify(req.token, login.refreshTokenSecret, (err, authData) => {
            if (err) {
                res.status(403).json({message: "Access denied!"});
            } else {
                // In case someone tries to access certain api endpoint with a different user id,
                // I am checking if the JWT is assigned to the correct user
                if (authData.user[0].id !== req.body.userId) {
                    return res.status(403).json({message: "Access denied, wrong user!"});
                }
                next();
            }
        });
    } else {
        res.status(403).json({message: "Access denied!"});
    }
}

// Middleware for microservices
// Only using this simplified way to save time,
// otherwise I would use jwt or something else if instructed
function verifyMicroserviceMiddleware(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];

        if (req.token !== '@#*ey974as93NalMLGasdf3632SL$#!') {
            res.status(403).json({message: "Access denied!"});
        } else {
            next();
        }
    } else {
        res.status(403).json({message: "Access denied!"});
    }
}

app.listen('3000', () => {
    console.log('Server started on port 3000');
});