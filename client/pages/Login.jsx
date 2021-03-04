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
        <div className="logInBtnsContainer">
          <button className='searchBtn' type="submit">Log In</button>
          <Link to='/signup'>
            <button className='navBtn'>Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
    );
}

export default withRouter(LogIn);