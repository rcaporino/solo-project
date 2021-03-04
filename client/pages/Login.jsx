import React from 'react';
import { Link, withRouter} from 'react-router-dom';

const LogIn = (props) => {
  return (
    <div>
      <h2>Log in!</h2>
      <form method="POST" className='logIn' onSubmit={props.handleLogIn}>
        <label>
          Username: 
          <input type="text" onChange={props.handleUsernameChange} />
        </label>
        <label>
          Password: 
          <input type="password" onChange={props.handlePasswordChange} />
        </label>
        <input type="submit" value='Log In!'/>
        <Link to='/signup'>
          <button>Sign Up</button>
        </Link>
      </form>
      
    </div>
    );
}

export default withRouter(LogIn);