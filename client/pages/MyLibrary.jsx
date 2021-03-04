import React from 'react';
import Books from '../components/Books.jsx';
import { Link, withRouter } from 'react-router-dom';

const MyLibrary = (props) => {
  const { userBooks, logOut } = props;

  return (
    <div>
      <div className='search'>
        <Link to='/home'>
          <button className='navBtn'>Home</button>
        </Link>
        <button className='logOutBtn' onClick={logOut}>Log Out</button>
      </div>
      <div className='results'>
        <Books allBooks={userBooks} library={true}/>
      </div>
    </div>
  );
};

export default withRouter(MyLibrary);