const Book = require('../model/bookModel');

const bookController = {};

bookController.createBook = (req, res, next) => {
  console.log('Attempting to create a book');
  const { ssid } = req.cookies;

  const newBook = {
    volumeInfo: {
      title: req.body.title,
      authors: req.body.authors,
      description: req.body.description,
      imageLinks: {
        thumbnail: req.body.imageLinks.thumbnail
      },
      pkey: `${ssid}${req.body.title}`
    }
  }

  Book.create(newBook)
    .then(data => {
      res.locals.newBook = data._id;
      return next();
    })
    .catch(err => {
      return next({
        log: `bookController.createBook: ERROR: Error creating a book: ${err}`,
        message: {
          err: "Error occurred in bookController.createBook. Check server log for more details"
        }
      });
    })
}

module.exports = bookController;