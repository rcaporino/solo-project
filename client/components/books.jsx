import React from 'react';
import Book from './Book.jsx';

const Books = (props) => {
  const { allBooks } = props;

  let books
  if(allBooks) books = allBooks.map(book => 
    <div key={book.id} >
      <Book volumeInfo={book.volumeInfo}/>
    </div>);

  return (
    <div className='allBooks'>
      {books}
    </div>
  );

}

export default Books;