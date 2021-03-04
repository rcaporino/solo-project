import React from 'react';
import Books from '../components/Books.jsx';
import { Link, withRouter } from 'react-router-dom';

const Home = (props) => {
  const { currSearchUpdate, search, booksSearch, addBook, getLibrary } = props;
  return (
    <div>
      <div className='search'>
        <input type='text' onChange={currSearchUpdate} />
        <button onClick={search}>Search!</button>
          <button onClick={getLibrary}>My Library</button>
        <button>Log Out</button>
      </div>
      <div className='results'>
        <Books allBooks={booksSearch} addBook={addBook} />
      </div>
    </div>
  );
};

export default withRouter(Home);
