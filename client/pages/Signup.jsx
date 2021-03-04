import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Signup = (props) => {
  return (
    <div>
      <h2>Sign Up!</h2>
      <form method='POST ' className='logIn' onSubmit={props.handleSignUp}>
        <label>
          Username:
          <input type='text' onChange={props.handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type='password' onChange={props.handlePasswordChange} />
        </label>
        <div className='logInBtnsContainer'>
          <button className='searchBtn' type='submit'>Sign Up</button>
          <Link to='/login'>
            <button className='logOutBtn'>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Signup);
