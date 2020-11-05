const express = require('express');
const router = express.Router();
const appNode = require('../app');
const login = require('./login');

router.post('/refresh-token', (req, res) => {
    const username = req.body.username;

    appNode.mysqlConnection.query("SELECT * FROM user WHERE username = ? AND status = 'active'", [username], (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (user.length === 0) {
                // console.log(result);
                res.status(404).send({message: `User ${username} not found.`});
            } else {
                // assign access token
                login.jwt.sign({user}, login.accessTokenSecret, {expiresIn: '7d'}, (err, accessToken) => {
                    if (err) {
                        console.log(`Refresh JWT1 error: ${err}`);
                        return res.status(500).send({message: err});
                    }

                    // assign refresh token
                    login.jwt.sign({user}, login.refreshTokenSecret, {expiresIn: '30d'}, (err, refreshToken) => {
                        if (err) {
                            console.log(`Refresh JWT2 error: ${err}`);
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
            }
        }
    });
});

module.exports = {router};
