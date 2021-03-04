const express = require('express');
const app = express();
const path = require('path');
const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const bookController = require('./controllers/bookController');

console.log(process.env.NODE_ENV);
const mongoURI = process.env.NODE_ENV === 'development' ? 'mongodb://localhost/soloprojectdev' : 'mongodb://localhost/soloprojectpro';

mongoose.connect(mongoURI, {useNewUrlParser: true});
const db = mongoose.connection
db.once('open', () => console.log(`Conneted to mogoose at ${mongoURI}`));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})

app.get('/isloggedin', sessionController.isLoggedIn, (req, res) => {
  return res.status(200).json(res.locals);
})

app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  return res.status(200).json(res.locals);
});

app.post('/logout', sessionController.endSession, (res, req) => {
  //const { ssid } = res.cookies;
  res.status(200).send();
})

app.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).send();
});

app.post('/addbook', bookController.createBook, userController.addBook, (req, res) => {
  console.log('responding from book creation');
  res.status(200).json(res.locals.data);
});

app.get('/mylibrary', userController.getLibrary, (req, res) => {
  res.status(200).json(res.locals.library);
})

app.get('/*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})



app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(defaultErr, err);
  
  console.log(errorObj.log);
  console.log(errorObj.status);
  res.status(errorObj.status).send({status: errorObj.status, error: errorObj.message.err});
});

app.listen(3000);