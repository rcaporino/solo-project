import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import fetch from 'isomorphic-fetch';

import Home from './pages/Home.jsx';
import LogIn from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MyLibrary from './pages/MyLibrary.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      currSearch: '',
      booksSearch: [],
      userBooks: [],
      auth: false,
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.currSearchUpdate = this.currSearchUpdate.bind(this);
    this.search = this.search.bind(this);
    this.addBook = this.addBook.bind(this);
    this.getLibrary = this.getLibrary.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleLogIn(e) {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.found) this.props.history.push('/signup');
        else {
          this.props.history.push('/home');
          this.setState({ password: '' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  }

  handleSignUp(e) {
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(this.props.history.push('/login'))
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  }

  currSearchUpdate(e) {
    this.setState({ currSearch: e.target.value });
  }

  search() {
    const searchQuery = this.state.currSearch.split(' ').join('+');
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40`
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ booksSearch: result.items });
      });
  }

  addBook(e, indx) {
    const currBook = this.state.booksSearch[indx].volumeInfo;
    console.log(currBook);
    fetch('/addbook', {
      method: 'POST',
      body: JSON.stringify({
        title: currBook.title,
        authors: currBook.authors,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).catch((err) => {
      console.log(err);
    });
  }

  getLibrary(e) {
    console.log('getting library');
    fetch('/mylibrary')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.state.userBooks = result;
        this.props.history.push('/mylibrary');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.props.history.push('/login');
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.props.location.pathname === '/login'
    ) {
      fetch('/isloggedin')
        .then((response) => response.json())
        .then((result) => {
          this.setState({ auth: result.auth });
          if (this.state.auth) this.props.history.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // if(this.props.location.pathname === '/mylibrary'){
    //   console.log('getting library');
    //   fetch('/mylibrary')
    //     .then((response) => response.json())
    //     .then((result) => {
    //       console.log(result);
    //       this.state.userBooks = result;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/signup'>
            <Signup
              handleSignUp={this.handleSignUp}
              handleUsernameChange={this.handleUsernameChange}
              handlePasswordChange={this.handlePasswordChange}
            />
          </Route>
          <Route path='/home'>
            <Home
              currSearchUpdate={this.currSearchUpdate}
              search={this.search}
              booksSearch={this.state.booksSearch}
              addBook={this.addBook}
              getLibrary={this.getLibrary}
            />
          </Route>
          <Route path='/login'>
            <LogIn
              handleLogIn={this.handleLogIn}
              handleUsernameChange={this.handleUsernameChange}
              handlePasswordChange={this.handlePasswordChange}
            />
          </Route>
          <Route path='/mylibrary'>
            <MyLibrary
              userBooks={this.state.userBooks}
              booksSearch={this.state.booksSearch}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
