const express = require('express');
const app = express();
const path = require('path');
const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('./controllers/userController');

console.log(process.env.NODE_ENV);
const mongoURI = process.env.NODE_ENV === 'development' ? 'mongodb://localhost/soloprojectdev' : 'mongodb://localhost/soloprojectpro';

mongoose.connect(mongoURI, {useNewUrlParser: true});
const db = mongoose.connection
db.once('open', () => console.log(`Conneted to mogoose at ${mongoURI}`));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})

app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals);
});

app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).send();
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