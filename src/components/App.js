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

    this.setState({ selectedDate: inputDate }, () => {
      fetch(`http://api.tvmaze.com/schedule?country=US&${formatDate(inputDate)}`)
      .then((response) => response.json())
      .then (
        response => { 
          this.setState( { films: { ...this.state.films, [+inputDate]: response } } ,
            () => { history.push('/films')  } ) 
        } 
      )

      // fetchFilms(inputDate)
      // .then(() => {fetchFilms(prevDay)} )
      // .catch(() => { console.log(this.state.films)} )
      // .then(() => { history.push('/films') } )
      // .catch(e => { console.error(e)} );
    });


    // const fetchFilms = (rowDate) => {
    //   return fetch(`http://api.tvmaze.com/schedule?country=US&${formatDate(rowDate)}`)
    //   .then((response) => (response.json()))
    //   .then(response => { this.setState( { films: { ...this.state.films, [+rowDate]: response } } ) } )
    //   .catch(e => {console.error(e)} );
    // }

    // this.setState({ selectedDate: inputDate }, () => {
    //   fetchFilms(inputDate)
    //   .then(() => {fetchFilms(prevDay)} )
    //   .catch(() => { console.log(this.state.films)} )
    //   .then(() => { history.push('/films') } )
    //   .catch(e => { console.error(e)} );
    // });
  }

  // setDateAndFetch(inputDate) {
  //   let prevDay = dateFns.subDays(inputDate, 1);
  //   const formatDate = (input) => dateFns.format(input, 'YYYY-MM-DD');
  //   const fetchFilms = (rowDate) => {
  //     return fetch(`http://api.tvmaze.com/schedule?country=US&${formatDate(rowDate)}`)
  //     .then((response) => (response.json()))
  //     .then(response => { this.setState( { films: { ...this.state.films, [+rowDate]: response } } ) } )
  //     .catch(e => {console.error(e)} );
  //   }

  //   this.setState({ selectedDate: inputDate }, () => {
  //     fetchFilms(inputDate)
  //     .then(() => {fetchFilms(prevDay)} )
  //     .catch(() => { console.log(this.state.films)} )
  //     .then(() => { history.push('/films') } )
  //     .catch(e => { console.error(e)} );
  //   });
  // }


  render() {
    let props = {
      nextMonth: this.nextMonth,
      prevMonth: this.prevMonth,
      setDateAndFetch: this.setDateAndFetch,
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
