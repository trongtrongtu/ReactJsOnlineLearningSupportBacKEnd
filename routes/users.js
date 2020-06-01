var router = global.router;
let User = require('../models/UserModel');
var mongoose = require('mongoose');

router.get('/list_all_messages', (request, response) => {
  let username = request.query.username
  User.find({ username }).limit(100).sort({ name: 1 }).select({
    _id: 1,
    username: 1,
    message: 1,
    created_date: 1,
    usernamefriend: 1,
  }).exec((err, users) => {
    if (err) {
      response.json({
        result: "failed",
        data: [],
        messege: `Error is : ${err}`
      });
    } else {
      response.json({
        result: "ok",
        data: users,
        messege: "Query myaccount successfully"
      });
    }
  });
});

router.post('/insert_new_message', (request, response) => {
  const newUser = new User({
    username: request.query.username,
    message: request.query.message,
    usernamefriend: request.query.usernamefriend,
  });
  newUser.save((err) => {
    debugger;
    if (err) {
      response.json({
        result: "failed",
        data: {},
        messege: `Error is : ${err}`
      });
    } else {
      console.log(request.query.usernamefriend)
      response.json({
        result: "ok",
        data: {
          username: request.query.username,
          message: request.query.message,
          usernamefriend: request.query.usernamefriend,
          messege: "Insert new user successfully"
        }
      });
    }
  });
});

module.exports = router;
