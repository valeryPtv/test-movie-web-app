import React, { Component } from 'react';
import DateChoice from './DateChoice';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <span className="header-logo"></span>
        </header>
        <div className="main">
          <DateChoice />
        </div>
      </div>
    );
  }
}

export default App;
