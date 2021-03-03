const express = require('express');
const app = express();
const path = require('path');
const fetch = require('isomorphic-fetch');
const mongoose = require('mongoose');
const User = require('./model/userModel');

console.log(process.env.NODE_ENV);
const mongoURI = process.env.NODE_ENV === 'development' ? 'mongodb://localhost/soloprojectdev' : 'mongodb://localhost/soloprojectpro';

mongoose.connect(mongoURI, {useNewUrlParser: true});
const db = mongoose.connection
db.once('open', () => console.log(`Conneted to mogoose at ${mongoURI}`));

app.get('/getusers', (req, res) => {
  User.find({}, (err, users) => {
    if(err) console.log(err)

    return res.status(200).json(users);
  })
})

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})

app.listen(3000);