import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class TestApi extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: null,
      users: null
    };
  }


  componentDidMount() {
    let mysearch = 'brandon sanderson';
    mysearch = mysearch.split(' ').join('+');
    console.log(mysearch);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${mysearch}&maxResults=40`)
    .then(response => response.json())
    .then(result => {
      this.setState({ books: result.items})
    });

    fetch('/getusers')
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })

  }

  render() {
    if(!this.state.books) return null;
    const bookNames = this.state.books.map(book => <li key={book.id}>{book.volumeInfo.title}</li>);
    return (
      <div>
        <div>Books: </div>
        <ul>{bookNames}</ul>
      </div>
    );
  }
}

export default TestApi;