import React, { Component } from 'react'
import Films from './Films';
import Home from './Home';
import { Route } from 'react-router-dom';

const Main = (props) => {

  return (
    <div className="main-content">
      <Route exact path="/" render={(callbackProps) => <Home {...props} />} />
      <Route path="/films" component={Films} />
    </div>
  )

}

export default Main;