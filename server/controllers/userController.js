const User = require('../model/userModel');

const userController = {};

userController.verifyUser = (req, res, next) => {
  // write code here
  const user = req.body.username;
  const password = req.body.password;
  User.find({username: user, password: password})
    .then((data) => {
      if(data.length === 0) {
        console.log('test');
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
  return next();
}


module.exports = userController