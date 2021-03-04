import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { render } from 'react-dom';
import App from './App.jsx';

//maybe need to import styles here!!
import styles from './scss/styles.scss'

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
