const express = require('express');
const router = express.Router();
const appNode = require('../app');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// I know that the jwt secret shouldn't be part of the code,
// I'm only using it this way because this is a job application task
const accessTokenSecret = crypto.createHash('md5').update('^@#$^dfsgs#$%#$%D234234dSFDDF3sfdsg#%#$%sg$ŽĐČžćđćWwerž#Đ3žĐĆŠĆa234fsfs').digest('hex');
const refreshTokenSecret = crypto.createHash('md5').update('^@#$^dfsgs#ag*)$@342sdJd351lldsg#%#$%sg$ŽĐČžćđćWwerž#Đ3žĐĆŠĆa234fsfs').digest('hex');

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
                bcrypt.compare(password, user[0].password, (err, resPw) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({message: err});
                    }
                    if (resPw === false) {
                        return res.status(404).send({message: "Incorrect password."});
                    }

                    // assign access token
                    jwt.sign({user}, accessTokenSecret, {expiresIn: '7d'}, (err, accessToken) => {
                        if (err) {
                            console.log(`Login JWT1 error: ${err}`);
                            return res.status(500).send({message: err});
                        }

                        // assign refresh token
                        jwt.sign({user}, refreshTokenSecret, {expiresIn: '30d'}, (err, refreshToken) => {
                            if (err) {
                                console.log(`Login JWT2 error: ${err}`);
                                return res.status(500).send({message: err});
                            }
                            res.status(200).send({
                                username: user[0].username,
                                firstName: user[0].first_name,
                                lastName: user[0].last_name,
                                email: user[0].email,
                                accessToken,
                                refreshToken
                            });
                        });
                    });
                });
            }
        }
    });
});

module.exports = {router, jwt, accessTokenSecret, refreshTokenSecret};