import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import Films from './Films';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />

          <div className="main">
            <Route exact path="/" component={Home}/>
            <Route path="/" component={Films}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
