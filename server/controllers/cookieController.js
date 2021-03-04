const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('setting ssid cookie');
  res.cookie('ssid', res.locals.userinfo[0]._id.toString(), { httpOnly: true});
  return next();
}

module.exports = cookieController;