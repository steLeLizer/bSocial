const express = require('express');
const router = express.Router();
const appNode = require('../app');

router.post('/follow-user', (req, res) => {
    const inputData = req.body;

    if (inputData.userId == inputData.userToFollowId) {
        return res.status(401).send({message: 'You can\'t follow yourself.'});
    }

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
                appNode.mysqlConnection.query(findUserQuery, [inputData.userToFollowId], (err, user) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({message: err});
                    } else {
                        if (user.length === 0) {
                            // console.log(result);
                            res.status(404).send({message: 'User to follow not found.'});
                        } else {
                            const findFollowQuery = "SELECT * FROM follow WHERE follower_user_id = ? AND followed_user_id = ?";
                            appNode.mysqlConnection.query(findFollowQuery, [inputData.userId, inputData.userToFollowId], (err, user) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send({message: err});
                                } else {
                                    if (user.length !== 0) {
                                        // console.log(result);
                                        res.status(401).send({message: 'You are already following this user.'});
                                    } else {
                                        const sql = "INSERT INTO follow (follower_user_id, followed_user_id) VALUES (?, ?)";
                                        appNode.mysqlConnection.query(sql, [inputData.userId, inputData.userToFollowId], (err) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(500).send({message: err});
                                            } else {
                                                res.status(200).send({message: 'User followed successfully!'});
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});

module.exports = {router};
