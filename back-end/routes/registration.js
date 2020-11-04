const express = require('express');
const router = express.Router();
const appNode = require('../app');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const kafkaConfig = require('../kafka/config');
const moment = require('moment');

// User registration
router.post('/register', (req, res) => {
    // I assume that the input data validation is done from front-end side
    const inputData = req.body;

    // I am using raw queries to save time for now, I might implement sequalize later on
    const findUserQuery = "SELECT * FROM user WHERE username = ? OR email = ?";

    appNode.mysqlConnection.query(findUserQuery, [inputData.username, inputData.email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (result.length !== 0) {
                // console.log(result);
                res.status(401).send({message: 'User already exists.'});
            } else {
                bcrypt.hash(inputData.password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({message: 'Server error, please try again later.'});
                    } else {
                        const sql = "INSERT INTO user (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)";
                        appNode.mysqlConnection.query(
                            sql,
                            [
                                inputData.firstName,
                                inputData.lastName,
                                inputData.username,
                                inputData.email,
                                hash
                            ], (err) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send({message: err});
                                } else {
                                    res.status(200).send({message: 'You have registered successfully!'});
                                    kafkaConfig.produce('bsocial', [{
                                        value: JSON.stringify({
                                            userData: {
                                                firstName: inputData.firstName,
                                                lastName: inputData.lastName,
                                                username: inputData.username,
                                                email: inputData.email
                                            },
                                            registrationDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                        })
                                    }]).catch(console.error);
                                }
                            }
                        );
                    }
                });
            }
        }
    });
});

module.exports = {router};
