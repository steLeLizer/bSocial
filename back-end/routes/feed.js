const express = require('express');
const router = express.Router();
const appNode = require('../app');
const kafkaConfig = require('../kafka/config');
const moment = require('moment');
const login = require('./login');

router.post('/feed-post', (req, res) => {
    const inputData = req.body;

    const findUserQuery = "SELECT * FROM user WHERE id = ?";
    appNode.mysqlConnection.query(findUserQuery, [inputData.userId], (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (user.length === 0) {
                // console.log(result);
                res.status(404).send({message: 'User not found.'});
            } else {
                const sql = "INSERT INTO post (content, user_id) VALUES (?, ?)";
                appNode.mysqlConnection.query(sql, [inputData.postContent, inputData.userId], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send({message: 'Posted successfully!'});
                        kafkaConfig.produce('bsocial', [{
                            value: JSON.stringify({
                                postData: {
                                    username: user[0].username,
                                    email: user[0].email,
                                    userId: inputData.userId,
                                    timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                    postId: result.insertId,
                                    messageContent: inputData.postContent
                                }
                            })
                        }]).catch(console.error);
                    }
                });
            }
        }
    });
});

router.post('/post-comment', (req, res) => {
    const inputData = req.body;

    const findUserQuery = "SELECT * FROM user WHERE id = ?";
    appNode.mysqlConnection.query(findUserQuery, [inputData.userId], (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (user.length === 0) {
                // console.log(result);
                res.status(404).send({message: 'User not found.'});
            } else {
                const checkFollowQuery = "SELECT user.* FROM user, post, follow " +
                    "WHERE (user.id = ? " +
                    "AND post.user_id = user.id) " +
                    "OR (user.id = ? " +
                    "AND follow.followed_user_id = (SELECT user_id FROM post WHERE id = ?) " +
                    "AND follow.follower_user_id = ?)";
                appNode.mysqlConnection.query(checkFollowQuery, [inputData.userId, inputData.userId, inputData.postId, inputData.userId], (err, senderUser) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({message: err});
                    } else {
                        // console.log(senderUser[0].username);
                        if (senderUser.length === 0) {
                            return res.status(401).send({message: 'You are not following this user.'});
                        }
                        const sql = "INSERT INTO comment (content, user_id, post_id) VALUES (?, ?, ?)";
                        appNode.mysqlConnection.query(sql, [inputData.commentContent, inputData.userId, inputData.postId], (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send({message: err});
                            } else {
                                // console.log(result.insertId);
                                res.status(200).send({message: 'Commented successfully!'});
                                kafkaConfig.produce('bsocial', [{
                                    value: JSON.stringify({
                                        commentData: {
                                            senderUsername: senderUser[0].username,
                                            senderEmail: senderUser[0].email,
                                            senderId: inputData.userId,
                                            timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                            postId: inputData.postId,
                                            commentId: result.insertId,
                                            commentContent: inputData.commentContent
                                        }
                                    })
                                }]).catch(console.error);
                            }
                        });
                    }
                });
            }
        }
    });
});

router.get('/feed', (req, res) => {
    const inputData = req.body;

    const findUserQuery = "SELECT * FROM user WHERE id = ?";
    appNode.mysqlConnection.query(findUserQuery, [inputData.userId], (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (user.length === 0) {
                // console.log(result);
                res.status(404).send({message: 'User not found.'});
            } else {
                // I added LIMIT and OFFSET to the query for the infinite scroll feature
                const sql = " SELECT * " +
                    "FROM post, user, (SELECT followed_user_id FROM follow WHERE follower_user_id = ? UNION SELECT ? user_id) a " +
                    "WHERE post.user_id = user.id " +
                    "AND post.user_id = a.followed_user_id " +
                    "ORDER BY post.timestamp DESC " +
                    "LIMIT ? " +
                    "OFFSET ?";
                appNode.mysqlConnection.query(sql, [inputData.userId, inputData.userId, inputData.limit, inputData.offset], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send({message: 'Feed retrieved successfully!', data: result});
                    }
                });
            }
        }
    });
});

module.exports = {router};
