const express = require('express');
const router = express.Router();
const appNode = require('../app');
const kafkaConfig = require('../kafka/config');
const moment = require('moment');

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
                res.status(404).send({message: `User not found.`});
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
                    }
                );
            }
        }
    });
});

module.exports = {router};
