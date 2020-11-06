Run "npm i" while in "bSocial/back-end/" directory to install dependencies.

Run command "npm start" (or "nodemon app.js" if you have nodemon installed globally) while in "bSocial/back-end/" directory to start the app.
(Make sure kafka is running locally)

API endpoints testing examples:

http://localhost:3000/authentication/register
BODY:
{
    "firstName": "Stefan",
    "lastName": "Djurovic",
    "username": "stefan.dj",
    "email": "stefan.dj@gmail.com",
    "password": "Stefan123"
}

http://localhost:3000/authentication/login
BODY:
{
    "username": "stefan.dj",
    "password": "Stefan123"
}

http://localhost:3000/validation/refresh-token
HEADERS:
{ 
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}
BODY:
{
    "userId": 13,
    "username": "stefan.dj"
}

http://localhost:3000/api/feed-post
HEADERS:
{ 
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}
BODY:
{
    "postContent": "Test content",
    "userId": 13
}

http://localhost:3000/api/post-comment
HEADERS:
{ 
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}
BODY:
{
    "commentContent": "Test content bla bla bla",
    "postId": 6,
    "userId": 14
}

http://localhost:3000/api/feed
HEADERS:
{ 
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}
BODY:
{
    "userId": 14,
    "limit": 10,
    "offset": 0
}

http://localhost:3000/api/post-comments
HEADERS:
{ 
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}
BODY:
{
    "userId": 14,
    "postId": 6,
    "limit": 3,
    "offset": 0
}

http://localhost:3000/api/follow-user
HEADERS:
{ 
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}
BODY:
{
    "userId": 14,
    "userToFollowId": 15
}

http://localhost:3000/micro-service/comment-notification
(just run comment-notifier micro-service app to test this route)
HEADERS:
{ 
  'Authorization': 'Bearer @#*ey974as93NalMLGasdf3632SL$#!',
  'Content-Type': 'application/json'
}
BODY:
{
  senderUsername: 'stefan.dj',
  senderEmail: 'stefan.dj@gmail.com',
  senderId: 13,
  timestamp: '2020-11-05 23:40:47',
  postId: 6,
  commentId: 26,
  commentContent: 'Test content bla bla bla 46'
}

http://localhost:3000/api/notifications
HEADERS:
{ 
  'Authorization': 'Bearer @#*ey974as93NalMLGasdf3632SL$#!',
  'Content-Type': 'application/json'
}
BODY:
{
    "userId": 13
}