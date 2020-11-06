const express = require('express');
const router = express.Router();
const appNode = require('../app');
const moment = require('moment');

router.post('/comment-notification', (req, res) => {
    if (!req.body.hasOwnProperty('commentData')) {
        return res.status(500).send({message: 'Server error, please try again later.'});
    }
    const inputData = req.body.commentData;

    const findReceivedBy = "SELECT user.* FROM user " +
        "LEFT JOIN post ON user.id = post.user_id " +
        "WHERE post.id = ?";
    appNode.mysqlConnection.query(findReceivedBy, [inputData.postId], (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        } else {
            if (user.length === 0) {
                // console.log(result);
                return res.status(404).send({message: 'Notification receiver not found.'});
            }

            // Don't execute the insert query if the user commented on his own post
            if (inputData.senderId == user[0].id) {
                return res.status(200).send({message: 'Notification inserted successfully!'});
            }
            const sql = "INSERT INTO notification " +
                "(created_by, received_by, post_id, type, content, link, timestamp) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
            appNode.mysqlConnection.query(
                sql,
                [
                    inputData.senderId,
                    user[0].id,
                    inputData.postId,
                    // If there were some other types of notification required for this task, I would change this
                    'comment',
                    inputData.commentContent,
                    `/${inputData.postId}/${inputData.commentId}`,
                    moment(inputData.timestamp).format('YYYY-MM-DD HH:mm:ss')
                ], (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send({message: 'Notification inserted successfully!'});
                    }
                }
            );
        }
    });
});

module.exports = {router};
