import React from 'react';
import Books from './Books.jsx';

const Home = (props) => {
  const { currSearchUpdate, search, booksSearch } = props;
  
    return (
      <div>
        <div className='search'>
          <input type="text" onChange={currSearchUpdate}/>
          <button onClick={search}>Search!</button>
        </div>
        <div className='results'>
          <Books allBooks={booksSearch}/>
        </div>
      </div>
    );
}

export default Home;