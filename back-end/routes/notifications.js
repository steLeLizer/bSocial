const express = require('express');
const router = express.Router();
const appNode = require('../app');

router.get('/notifications', (req, res) => {
    const inputData = req.body;

    const findUserQuery = "SELECT * FROM user WHERE id = ? AND status = 'active'";
    appNode.mysqlConnection.query(findUserQuery, [inputData.userId], (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (user.length === 0) {
                // console.log(result);
                res.status(404).send({message: 'User not found.'});
            } else {
                const sql = "SELECT * FROM notification WHERE received_by = ? AND seen = 'no';";
                appNode.mysqlConnection.query(sql, [inputData.userId], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send({message: 'Notifications retrieved successfully!', data: result});
                    }
                });
            }
        }
    });
});

module.exports = {router};
