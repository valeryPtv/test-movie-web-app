import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import dateFns from 'date-fns';

class App extends Component {
  constructor(props) {
    super(props);

    let today = new Date();

    this.state = {
      selectedMonth: today,
      selectedDate: today
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  nextMonth() {
    this.setState({ selectedMonth: dateFns.addMonths(this.state.selectedMonth, 1) })
  }

  prevMonth() {
    this.setState({ selectedMonth: dateFns.subMonths(this.state.selectedMonth, 1) })
  }

  setDate(inputDate) {
    this.setState({ selectedDate: inputDate });
  }

  render() {
    // let methods = {this.nextMonth}
    let props = {
      nextMonth: this.nextMonth, 
      prevMonth: this.prevMonth, 
      setDate: this.setDate, 
      ...this.state
    };

    return (
      <BrowserRouter>
        <div className="app">
          <div className="page-wrapper">
            <Header />
            <Main {...props} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
