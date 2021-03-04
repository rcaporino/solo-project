import React from 'react';
import Books from '../components/Books.jsx';
import { Link, withRouter } from 'react-router-dom';

const MyLibrary = (props) => {
  const { userBooks } = props;

  return (
    <div>
      <div className='search'>
        <Link to='/home'>
          <button>Home</button>
        </Link>
        <button>Log Out</button>
      </div>
      <div className='results'>
        <Books allBooks={userBooks}/>
      </div>
    </div>
  );
};

export default withRouter(MyLibrary);