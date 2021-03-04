import React from 'react';
import Book from './Book.jsx';

const Books = (props) => {
  const { allBooks, addBook, library } = props;

  let books
  if(allBooks) books = allBooks.map((book, indx) => 
    <div key={book.id} >
      <Book volumeInfo={book.volumeInfo} addBook={addBook} indx={indx} library={library}/>
    </div>);

  return (
    <div className='allBooks'>
      {books}
    </div>
  );

}

export default Books;