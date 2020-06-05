var router = global.router;
let ChatUserToUser = require('../models/ChatUserToUserModel');
let ChatUserToRoom = require('../models/ChatUserToRoomModel');
var mongoose = require('mongoose');

router.get('/message_with_user_to_user', (request, response) => {
    let username = request.query.username;
    const messageWithUser = [];
    ChatUserToUser.find({ username }).limit(100).sort({ name: 1 }).select({
        _id: 1,
        username: 1,
        message: 1,
        created_date: 1,
        usernamefriend: 1
    }).exec((err, messages) => {
        if (err) {
            response.json({
                result: "failed_error",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            if (messages.length == 0) {
                response.json({
                    result: "failed_message",
                    data: messages,
                    messege: "User haven't message"
                });
            } else {
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].usernamefriend == request.query.usernamefriend) {
                        messageWithUser.push({
                            id: max + 1,
                            username: messages[i].username,
                            message: messages[i].message,
                            created_date: messages[i].created_date,
                            usernamefriend: messages[i].usernamefriend
                        })
                    }
                }
                if (messageWithUser.length == 0) {
                    response.json({
                        result: "failed_MessageWithFriend",
                        data: messageWithUser,
                        messege: "User haven't message with friend"
                    });
                } else {
                    response.json({
                        result: "ok",
                        data: messageWithUser,
                        messege: "Query room successfully"
                    });
                }
            }
        }
    });
});
router.get('/message_with_user_to_room', (request, response) => {
    let username = request.query.username;
    const messageWithRoom = [];
    ChatUserToRoom.find({ username }).limit(100).sort({ name: 1 }).select({
        _id: 1,
        username: 1,
        message: 1,
        created_date: 1,
        roomName: 1
    }).exec((err, messages) => {
        if (err) {
            response.json({
                result: "failed_error",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            if (messages.length == 0) {
                response.json({
                    result: "failed_message",
                    data: messages,
                    messege: "User haven't message"
                });
            } else {
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].roomName == request.query.roomName) {
                        messageWithRoom.push({
                            id: max + 1,
                            username: messages[i].username,
                            message: messages[i].message,
                            created_date: messages[i].created_date,
                            roomName: messages[i].roomName
                        })
                    }
                }
                if (messageWithRoom.length == 0) {
                    response.json({
                        result: "failed_MessageWithFriend",
                        data: messageWithRoom,
                        messege: "User haven't message with friend"
                    });
                } else {
                    response.json({
                        result: "ok",
                        data: messageWithRoom,
                        messege: "Query room successfully"
                    });
                }
            }
        }
    });
});

module.exports = router;