import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import css
import './index.css';

// import components
import Gutenberg from './components/App';

ReactDOM.render(
  <BrowserRouter>
      <Gutenberg />
   </BrowserRouter>,
  document.getElementById('root')
);

