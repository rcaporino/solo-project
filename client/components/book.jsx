import React from 'react';
import LabeledText from './LabeledText.jsx';

const Book = (props) => {
  const { volumeInfo, addBook, indx} = props;
  return(
    <div className='book'>
      <LabeledText label='Title' text={volumeInfo.title}/>
      <LabeledText label='Author(s)' text={volumeInfo.authors}/>
      <button onClick={(e) => addBook(e, indx)}>Add to Library</button>
    </div>
  )
}

export default Book;