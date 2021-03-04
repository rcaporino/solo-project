const Session = require('../model/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  console.log('checking if there is a current session');
  const { ssid } = req.cookies;
  console.log(ssid);
  Session.find({ cookieId: ssid })
    .then(data => {
      if (data.length > 0) {
        //console.log(data);
        console.log('cookiematches: ', data[0].cookieId === ssid);
        res.locals.auth = true;
        return next();
      }
      else {
        res.locals.auth = false;
        return next();
      }
    })
    .catch(err => {
      return next({
        log: `sessionController.isLoggedIn: ERROR: Error authing a session: ${err}`,
        message: {
          err: "Error occurred in sessionController.isLoggedIn. Check server log for more details"
        }
      });
    });

};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  console.log('starting session');

  const session = { cookieId: res.locals.userinfo[0]._id.toString() };
  Session.create(session)
    .then(next())
    .catch(err => {
      return next({
        log: `sessionController.startSession: ERROR: Error starting a session: ${err}`,
        message: {
          err: "Error occurred in sessionController.startSession. Check server log for more details"
        }
      });
    })
};

module.exports = sessionController;
