var router = global.router;
let CreateRoom = require('../models/CreateRoomModel');
let UserJoinRoom = require('../models/UserJoinRoomModel');
var mongoose = require('mongoose');

router.get('/list_all_createroom', (request, response) => {
    CreateRoom.find({}).limit(100).sort({ name: 1 }).select({
        _id: 1,
        username: 1,
        roomNameCreate: 1,
    }).exec((err, createrooms) => {
        if (err) {
            response.json({
                result: "failed",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            response.json({
                result: "ok",
                data: createrooms,
                messege: "Query room successfully"
            });
        }
    });
});
router.get('/list_all_users_join_room', (request, response) => {
    UserJoinRoom.find({}).limit(100).sort({ name: 1 }).select({
        _id: 1,
        username: 1,
        roomNameJoin: 1,
    }).exec((err, joinrooms) => {
        if (err) {
            response.json({
                result: "failed",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            response.json({
                result: "ok",
                data: joinrooms,
                messege: "Query room successfully"
            });
        }
    });
});
router.get('/list_all_users_with_room', (request, response) => {
    let roomNameJoin = request.query.roomNameJoin;
    UserJoinRoom.find({ roomNameJoin }).limit(100).sort({ name: 1 }).select({
        _id: 1,
        username: 1,
        roomNameJoin: 1,
    }).exec((err, joinrooms) => {
        if (err) {
            response.json({
                result: "failed",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            response.json({
                result: "ok",
                data: joinrooms,
                messege: "Query room successfully"
            });
        }
    });
});
router.get('/user_create_room', (request, response) => {
    let roomNameCreate = request.query.roomName;
    CreateRoom.find({ roomNameCreate }).limit(100).sort({ name: 1 }).select({
        _id: 1,
        username: 1,
        roomNameCreate: 1,
    }).exec((err, createrooms) => {
        if (err) {
            response.json({
                result: "failed",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            response.json({
                result: "ok",
                data: createrooms,
                messege: "Query room successfully"
            });
        }
    });
});
router.get('/list_all_rooms_with_user', (request, response) => {
    let username = request.query.username;
    UserJoinRoom.find({ username }).limit(100).sort({ name: 1 }).select({
        _id: 1,
        username: 1,
        roomNameJoin: 1,
    }).exec((err, joinrooms) => {
        if (err) {
            response.json({
                result: "failed",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            response.json({
                result: "ok",
                data: joinrooms,
                messege: "Query room successfully"
            });
        }
    });
});

router.get('/create_room', (request, response) => {
    let roomNameCreate = request.query.roomNameCreate;
    CreateRoom.find({ roomNameCreate }).limit(100).sort({ name: 1 }).select({
        roomNameCreate: 1
    }).exec((err, createrooms) => {
        if (createrooms.length == 1) {
            count = 1;
            response.json({
                result: "failed",
                data: createrooms,
                messege: "Room already exists"
            });
        } else {
            const newRoom = new CreateRoom({
                username: request.query.username,
                roomNameCreate: request.query.roomNameCreate,
                passwordRoom: request.query.passwordRoom,
            });
            newRoom.save((err) => {
                debugger;
                if (err) {
                    response.json({
                        result: "failed",
                        data: {},
                        messege: `Error is : ${err}`
                    });
                } else {
                    response.json({
                        result: "ok",
                        data: {
                            username: request.query.username,
                            roomNameCreate: request.query.roomNameCreate,
                            passwordRoom: request.query.passwordRoom,
                            messege: "Create room successfully"
                        }
                    });
                }
            });
        }
    });
});
router.get('/join_room', (request, response) => {
    let roomNameCreate = request.query.roomNameJoin;
    let count = 0;
    CreateRoom.find({ roomNameCreate }).limit(100).sort({ name: 1 }).select({
        passwordRoom: 1
    }).exec((err, password) => {
        if (password[0].passwordRoom != request.query.passwordRoom) {
            response.json({
                result: "failed_password",
                data: password,
                messege: "Password wrong"
            });
        } else {
            let roomNameJoin = request.query.roomNameJoin;
            UserJoinRoom.find({ roomNameJoin }).limit(100).sort({ name: 1 }).select({
                username: 1
            }).exec((err, users) => {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].username == request.query.username) {
                        count = 1;
                        response.json({
                            result: "failed_joined",
                            data: password,
                            messege: "User joined the room"
                        });
                    }
                }
                if (count == 0) {
                    const joinRoom = new UserJoinRoom({
                        username: request.query.username,
                        roomNameJoin: request.query.roomNameJoin,
                    });
                    joinRoom.save((err) => {
                        debugger;
                        if (err) {
                            response.json({
                                result: "failed",
                                data: {},
                                messege: `Error is : ${err}`
                            });
                        } else {
                            response.json({
                                result: "ok",
                                data: {
                                    username: request.query.username,
                                    roomNameJoin: request.query.roomNameJoin,
                                    messege: "Join room successfully"
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
