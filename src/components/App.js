import React, { Component } from 'react';
import Main from './Main';
import { Router } from 'react-router-dom';
import dateFns from 'date-fns';
import history from './history';

class App extends Component {
  constructor(props) {
    super(props);

    let today = new Date();

    this.state = {
      selectedMonth: today,
      selectedDate: today,
      isModalShown: false
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.showModal = this.showModal.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  nextMonth() {
    this.setState({ selectedMonth: dateFns.addMonths(this.state.selectedMonth, 1) })
  }

  prevMonth() {
    this.setState({ selectedMonth: dateFns.subMonths(this.state.selectedMonth, 1) })
  }

  setDate(inputDate) {
    this.setState((state) => ({ selectedDate: inputDate }))
  }

  showModal() {
    this.setState({ isModalShown: !this.state.isModalShown })
  }

  render() {
    let props = {
      nextMonth: this.nextMonth,
      prevMonth: this.prevMonth,
      showModal: this.showModal,
      setDate: this.setDate,
      ...this.state
    };

    return (
      <Router history={history}>
        <div className="app">
          <Main {...props} />
        </div>
      </Router>
    );
  }
}

export default App;
