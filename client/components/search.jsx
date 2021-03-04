import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Books from './Books.jsx';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      currSearch: '',
      books: []
    }

    this.currSearchUpdate = this.currSearchUpdate.bind(this);
    this.search = this.search.bind(this);
  }

  currSearchUpdate(event) {
    this.setState({currSearch: event.target.value});
  }

  search(event) {
    const searchQuery = this.state.currSearch.split(' ').join('+');
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40`)
    .then(response => response.json())
    .then(result => {
      this.setState({ books: result.items})
    });
  }

  render() {
    return (
      <div>
        <div className='search'>
          <input type="text" onChange={this.currSearchUpdate}/>
          <button onClick={this.search}>Search!</button>
        </div>
        <div className='results'>
          <Books allBooks={this.state.books}/>
        </div>
      </div>
    )
  }
}

export default Search;