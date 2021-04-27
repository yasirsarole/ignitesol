import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import styling
import './App.css';

// import components
import GutenbergHome from './GutenbergHome';
import GenreDetail from './GenreDetail';
import Error from './Error';

class Gutenberg extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/" component={GutenbergHome} exact />
          <Route path="/genre-detail" component={GenreDetail} />
          <Route component={Error} />
        </Switch>
      </main>
    )
  }
}

export default Gutenberg;
