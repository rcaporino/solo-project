import React from 'react';
import Books from '../components/Books.jsx';
import { Link, withRouter } from 'react-router-dom';

const Home = (props) => {
  const { currSearchUpdate, search, booksSearch, addBook, getLibrary, logOut } = props;
  return (
    <div>
      <div className='search'>
        <input type='text' onChange={currSearchUpdate} placeholder="Search..." />
        <button className='searchBtn' onClick={search}>Search!</button>
        <button className='navBtn' onClick={getLibrary}>My Library</button>
        <button className='logOutBtn' onClick={logOut}>Log Out</button>
      </div>
      <div className='results'>
        <Books allBooks={booksSearch} addBook={addBook} library={false} />
      </div>
    </div>
  );
};

export default withRouter(Home);
