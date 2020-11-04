const express = require('express');
const router = express.Router();
const appNode = require('../app');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// I know that the jwt secret shouldn't be part of the code,
// I'm only using it this way because this is a job application task
const secret = crypto.createHash('md5').update('^@#$^dfsgs#$%#$%D234234dSFDDF3sfdsg#%#$%sg$ŽĐČžćđćWwerž#Đ3žĐĆŠĆa234fsfs').digest('hex');

// User login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    appNode.mysqlConnection.query("SELECT * FROM user WHERE username = ?", [username], (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (user.length === 0) {
                // console.log(result);
                res.status(404).send({message: `User ${username} not found.`});
            } else {
                bcrypt.compare(password, user.password, function (err, resPw) {
                    if (err) {
                        return res.status(500).send({message: err});
                    }
                    if (resPw === false) {
                        return res.status(404).send({message: "Incorrect password."});
                    }
                    // assign token
                    jwt.sign({user}, secret, {expiresIn: '7d'}, (err, token) => {
                        if (err) {
                            console.log(`Login JWT error: ${err}`);
                            return res.status(500).send({message: err});
                        }
                        res.status(200).send({
                            username: user.username,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            email: user.email,
                            token
                        });
                    });
                });
            }
        }
    });
});

module.exports = {router, jwt, secret};