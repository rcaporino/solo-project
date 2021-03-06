const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  volumeInfo: {
    title: { type: String, required: true },
    authors: { type: Array, required: true },
    description: {type: String},
    imageLinks: {
      thumbnail: { type: String }
    },
    pkey: { type: String, required: true, unique: true }
  }
});

module.exports = mongoose.model('Book', bookSchema);