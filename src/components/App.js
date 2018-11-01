import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import dateFns from 'date-fns';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate()
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }


  nextMonth() {
    console.log('nextMonth');
    this.setState((prevState) => { selectedMonth: dateFns.addMonths(prevState.selectedMonth, 1) })
  }

  prevMonth() {
    this.setState((prevState) => { selectedMonth: dateFns.subMonths(prevState.selectedMonth, 1) })
  }

  //       currentMonth: dateFns.addMonths(this.state.currentMonth, 1)

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="page-wrapper">
            <Header />
            <Main nextMonth={this.nextMonth} prevMonth={this.prevMonth}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
