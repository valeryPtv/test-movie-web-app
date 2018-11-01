import React, { Component } from 'react';
import angleLeft from './../images/angle-left.svg';
import angleRight from './../images/angle-right.svg';

const Calendar = (props) => {
    return (
      <div className="calendar-container">
        <CalendarHeader nextMonth={props.nextMonth} prevMonth={props.prevMonth} />
      </div>
    )

}

const CalendarHeader = (props) => {

  return (
    <div className="calendar-header">
      <a href="#" className="change-month">
        <img src={angleLeft} alt="previous month" onClick={props.prevMonth}/>
      </a>

      <strong className="month-name">Ноябрь</strong>

      <a href="#" className="change-month">
        <img src={angleRight} alt="next month" onClick={props.nextMonth}/>
      </a>
    </div>
  );
}

const CalendarBody = (props) => {
  let dates = [];

  for (let i = 1; i <= 35; i++) {
    dates.push(i);
  }

  return (
    <table className="calendar-body">
      <tbody>
        
      </tbody>
    </table>

    // <ul className="calendar-body">
    //   {
    //     dates.map(date => (
    //       <li className="calendar-cell">
    //         <a href="#" className="calendar-link">{date}</a>
    //       </li>)
    //     )
    //   }
    // </ul>
  );
}

export default Calendar;