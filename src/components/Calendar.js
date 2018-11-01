import React, { Component } from 'react';
import angleLeft from './../images/angle-left.svg';
import angleRight from './../images/angle-right.svg';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

class Calendar extends Component {
  constructor(props) {
    super(props);
    // this.props.setDate

    let today = new Date();

    this.state = {
      selectedMonth: today,
      selectedDate: today
    };

    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }


  nextMonth() {
    this.setState({ selectedMonth: dateFns.addMonths(this.state.selectedMonth, 1) })
    console.log(this.state);
  }

  prevMonth() {
    this.setState({ selectedMonth: dateFns.subMonths(this.state.selectedMonth, 1) })
  }

  renderCells() {
    const { selectedMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(selectedMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    let day = startDate;
    let rows = [];

    while (day <= endDate) {
      let row = [];

      for (let i = 0; i < 7; i++) {
        row.push(
          <td className={`calendar-cell ${
            dateFns.isSameMonth(day, monthStart) ?
              (dateFns.isSameDay(day, selectedDate) ? 'selected-cell' : 'disabled-cell') : null
            }`}>

          </td>
        );
      }
    }
  }

  render() {
    let monthString = dateFns.format(this.state.selectedMonth, 'MMMM', { locale: ruLocale });
    monthString = monthString[0].toUpperCase() + monthString.slice(1);

    return (
      <div className="calendar-container">
        <CalendarHeader nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
          selectedMonth={monthString}
        />
      </div>
    )
  }

}

const CalendarHeader = (props) => {

  return (
    <div className="calendar-header">
      <a href="#" className="change-month">
        <img src={angleLeft} alt="previous month" onClick={props.prevMonth} />
      </a>

      <strong className="month-name">{props.selectedMonth}</strong>

      <a href="#" className="change-month">
        <img src={angleRight} alt="next month" onClick={props.nextMonth} />
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