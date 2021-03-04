import React, { Component } from 'react';

import { Switch, Route, Link, withRouter} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
//import history from './history.js';

import Search from './components/Search.jsx';
import LogIn from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  
  handleUsernameChange(e) {
      this.setState({username: e.target.value}, () => {
        console.log(this.state.username);
      })
  }
  
  handlePasswordChange(e) {
    this.setState({password: e.target.value}, () => {
      console.log(this.state.password);
    })
  }

  handleLogIn(e) {
    fetch('http://localhost:8080/login', {
      method: "POST",
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => {
      if (!json.found) this.props.history.push('/signup');
      else this.props.history.push('/home');
    })
    .catch(err => console.log(err));
    e.preventDefault();
  }

  handleSignUp(e) {
    e.preventDefault();
    this.props.history.push('/login');
  }

  render(){

    return (
      <div>
        <Switch>
          <Route path="/signup">
            <Signup handleSignUp={this.handleSignUp} handleUsernameChange={this.handleUsernameChange} handlePasswordChange={this.handlePasswordChange}/>
          </Route>
          <Route path="/users">
            <this.Users />
          </Route>
          <Route path="/home">
            <Search />
          </Route>
          <Route path="/">
            <LogIn handleLogIn={this.handleLogIn} handleUsernameChange={this.handleUsernameChange} handlePasswordChange={this.handlePasswordChange}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
