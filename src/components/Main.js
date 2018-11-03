import React from 'react'
import Films from './Films';
import Home from './Home';
import { Route } from 'react-router-dom';

const Main = (props) => {
  let propsHome = {
    nextMonth: props.nextMonth,
    prevMonth: props.prevMonth,
    setDateAndFetch: props.setDateAndFetch,
    selectedMonth: props.selectedMonth,
    selectedDate: props.selectedDate
  };

  let propsFilms = {
    selectedDate: props.selectedDate,
    films: props.films
  };

  return (
    <div className="main-content">
      <Route exact path="/" render={(callbackProps) => <Home {...propsHome} />} />
      <Route path="/films" render={(callbackProps) => <Films {...propsFilms} />} />
    </div>
  )

}

export default Main;