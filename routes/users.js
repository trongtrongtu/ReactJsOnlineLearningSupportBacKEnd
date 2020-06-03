var router = global.router;
let User = require('../models/UserModel');
var mongoose = require('mongoose');

router.get('/list_all_users', (request, response) => {
  User.find({}).limit(100).sort({ name: 1 }).select({
    _id: 1,
    username: 1,
    password: 1,
    dia_chi: 1,
    gioi_tinh: 1,
    ngay_sinh: 1,
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
        messege: "Query users successfully"
      });
    }
  });
});

router.post('/insert_new_user', (request, response) => {
  const newUser = new User({
    username: request.query.username,
    password: request.query.password,
    dia_chi: request.query.dia_chi,
    gioi_tinh: request.query.gioi_tinh,
    ngay_sinh: request.query.ngay_sinh,
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
          password: request.query.password,
          dia_chi: request.query.dia_chi,
          gioi_tinh: request.query.gioi_tinh,
          ngay_sinh: request.query.ngay_sinh,
          messege: "Insert new user successfully"
        }
      });
    }
  });
});

module.exports = router;
