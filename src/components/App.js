import React, { Component } from 'react';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import dateFns from 'date-fns';

class App extends Component {
  constructor(props) {
    super(props);

    let today = new Date();

    this.state = {
      selectedMonth: today,
      selectedDate: today,
      films: {}
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.setDateAndFetch = this.setDateAndFetch.bind(this);
  }

  nextMonth() {
    this.setState({ selectedMonth: dateFns.addMonths(this.state.selectedMonth, 1) })
  }

  prevMonth() {
    this.setState({ selectedMonth: dateFns.subMonths(this.state.selectedMonth, 1) })
  }

  setDateAndFetch(inputDate) {
    let prevDay = dateFns.subDays(inputDate, 1);
    const formatDate = (input) => dateFns.format(input, 'YYYY-MM-DD');
    const fetchFilms = (rowDate) => {
      return fetch(`http://api.tvmaze.com/schedule?country=US&${formatDate(rowDate)}`)
      .then((response) => (response.json()))
      .then(response => { this.setState( { films: { [+rowDate]: response } } ) } )
      .then(() => console.log(this.state.films))
      .catch(e => {console.error(e)} );
    }

    this.setState({ selectedDate: inputDate }, () => {
      fetchFilms(inputDate)
      .then(() => {fetchFilms(prevDay)} )
    });
  }

  render() {
    let props = {
      nextMonth: this.nextMonth,
      prevMonth: this.prevMonth,
      setDateAndFetch: this.setDateAndFetch,
      selectedMonth: this.state.selectedMonth,
      selectedDate: this.state.selectedDate
    };

    return (
      <BrowserRouter>
        <div className="app">
          <Main {...props} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
