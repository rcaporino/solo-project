import React from 'react';
import LabeledText from './LabeledText.jsx';

const Book = (props) => {
  const { volumeInfo } = props;
  return(
    <div className='book'>
      <LabeledText label='Title' text={volumeInfo.title}/>
      <LabeledText label='Author(s)' text={volumeInfo.authors}/>
    </div>
  )
}

export default Book;