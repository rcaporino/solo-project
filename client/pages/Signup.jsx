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
        <input type='submit' value='Sign Up' />
        <Link to='/login'>
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(Signup);
