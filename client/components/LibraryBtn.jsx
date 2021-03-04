import React from 'react';

const LibraryButton = (props) => {
  const { addBook, indx, library } = props;
  let text = 'Remove From Library';
  if(!library) text = 'Add to Library'
  return (
    <button className='addLibBtn' onClick={(e) => addBook(e, indx)}>{text}</button>
  );
}

export default LibraryButton;