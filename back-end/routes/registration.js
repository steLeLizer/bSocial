const express = require('express');
const router = express.Router();
const appNode = require('../app');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//User registration
router.post('/register', (req, res) => {
    // I assume that the input data validation is done from front-end using regex
    const inputData = req.body;

    const findUserQuery = 'SELECT * FROM user WHERE username = ? OR email = ?';
    appNode.mysqlConnection.query(findUserQuery, [inputData.username, inputData.email], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (result.length !== 0) {
                console.log(result);
                res.status(401).send({message: 'User already exists.'});
            } else {
                const sql = 'INSERT INTO user (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)';
                appNode.mysqlConnection.query(
                    sql,
                    [
                        inputData.firstName,
                        inputData.lastName,
                        inputData.username,
                        inputData.email,
                        bcrypt.hashSync(inputData.password, saltRounds)
                    ], (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send({message: err});
                        } else {
                            res.status(200).send({message: 'You have registered successfully!'});
                        }
                    }
                );
            }
        }
    });
});

module.exports = {router};
