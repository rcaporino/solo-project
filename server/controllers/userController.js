const User = require('../model/userModel');

const userController = {};

userController.verifyUser = (req, res, next) => {
  // write code here
  console.log('VerifyUser');
  const user = req.body.username;
  const password = req.body.password;
  User.find({ username: user, password: password })
    .then((data) => {
      if (data.length === 0) {
        res.locals.found = false;
      } else {
        res.locals.found = true;
      }
      res.locals.userinfo = data;
      return next();
    })
    .catch(err => {
      return next({
        log: 'userController.verifyUser: ERROR: Error getting user data',
        message: {
          err: "Error occurred in userController.verifyUser. Check server log for more details"
        }
      });
    })
};

userController.createUser = (req, res, next) => {
  console.log('creating user')

  const newUser = { username: req.body.username, password: req.body.password };
  User.create(newUser)
    .then((data) => {
      res.locals.userinfo = data;
      return next();
    })
    .catch(err => {
      return next({
        log: `userController.createUser: ERROR: Error creating a user: ${err}`,
        message: {
          err: "Error occurred in userController.createUser. Check server log for more details"
        }
      });
    })
}

userController.addBook = (req, res, next) => {
  console.log('adding book to user');
  const { ssid } = req.cookies;

  User.findByIdAndUpdate(ssid,
    { $push: { library: res.locals.newBook }},
    { new: true, useFindAndModify: false }
    )
    .catch(err => {
      return next({
        log: `userController.addBook: ERROR: Error adding a book to user: ${err}`,
        message: {
          err: "Error occurred in userController.addBook. Check server log for more details"
        }
      });
    })
}

userController.getLibrary = (req, res, next) => {
  console.log('getting library')

  const { ssid } = req.cookies;

  User.find({ _id: ssid })
    .populate('library')
    .then(data => {
      res.locals.library = data[0].library;
      return next()
    })
    .catch(err => {
      return next(err);
    });
}


module.exports = userController