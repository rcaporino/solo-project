import React from 'react';
import LabeledText from './LabeledText.jsx';
import LibraryBtn from './LibraryBtn.jsx';

const Book = (props) => {
  const { volumeInfo, addBook, indx, library } = props;
  let image = undefined;
  if (volumeInfo.imageLinks) {
    image = volumeInfo.imageLinks.thumbnail;
  }
  let authors;
  if (volumeInfo.authors) {
    authors = volumeInfo.authors.join(', ');
  }


  return (
    <div className='book'>
      <div className='bookContents'>
        <div className='imageContainer'>
          <img src={image} alt='bookimg' />
        </div>
        <div className='labels'>
          <h2>{volumeInfo.title} </h2>
          <LabeledText label='Author(s)' text={authors} />
          <LabeledText label='Description' text={volumeInfo.description} />
        </div>
      </div>
      <LibraryBtn addBook={addBook} indx={indx} library={library}/>
    </div>
  );
};

export default Book;
