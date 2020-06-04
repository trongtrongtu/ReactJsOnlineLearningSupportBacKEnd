var router = global.router;
let CreateRoom = require('../models/CreateRoomModel');
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

router.post('/create_room', (request, response) => {
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

module.exports = router;
