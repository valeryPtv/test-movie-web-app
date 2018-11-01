import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import dateFns from 'date-fns';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: dateFns.format(new Date(), 'YYYY-MM-DD')
    };

    this.setDate = this.setDate.bind(this);
  }

  
  setDate(inputDate) {
    this.setState({selectedDate: dateFns.format(inputDate, 'YYYY-MM-DD')});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="page-wrapper">
            <Header />
            <Main setDate={this.setDate}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
