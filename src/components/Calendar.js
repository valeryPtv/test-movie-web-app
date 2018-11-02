import React from 'react';
import angleLeft from './../images/angle-left.svg';
import angleRight from './../images/angle-right.svg';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { NavLink } from 'react-router-dom';

const Calendar = (props) => {
  return (
    <div className="calendar-container">
      <CalendarHeader nextMonth={props.nextMonth}
        prevMonth={props.prevMonth}
        selectedMonth={props.selectedMonth}
        />

      <CalendarBody 
        setDateAndFetch={props.setDateAndFetch} 
        selectedDate={props.selectedDate} 
        selectedMonth={props.selectedMonth}
      />
    </div>
  )
}

const CalendarHeader = (props) => {
  let monthString = dateFns.format(props.selectedMonth, 'MMMM', { locale: ruLocale });
  monthString = monthString[0].toUpperCase() + monthString.slice(1);

  return (
    <div className="calendar-header">
      <a href="#" className="angle">
        <img src={angleLeft} alt="previous month" onClick={props.prevMonth} />
      </a>

      <strong className="month-name">{monthString}</strong>

      <a href="#" className="angle">
        <img src={angleRight} alt="next month" onClick={props.nextMonth} />
      </a>
    </div>
  );
}

const CalendarBody = (props) => {
  const { selectedMonth, selectedDate, setDateAndFetch } = props;
  const monthStart = dateFns.startOfMonth(selectedMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);
  let weeksAmount = dateFns.differenceInCalendarWeeks(endDate, startDate) + 1;
  const dateFormat = 'D';


  let day = startDate;
  let rows = [];

  while (day <= endDate) {
    let row = [];
    
    for (let i = 0; i < 7; i++) {
      let dayCopy = day;
      row.push(
        <td key={i} 
          onClick={() => setDateAndFetch(dayCopy)} 
          className={`calendar-cell ${
            dateFns.isSameMonth(day, monthStart) ?
              (dateFns.isSameDay(day, selectedDate) ? 'selected-cell' : '') : 'disabled-cell'
            }`
          }
        >
          <NavLink to='/films' className="film-link">{dateFns.format(day, dateFormat)}</NavLink>
        </td>
      );
      
      day = dateFns.addDays(day, 1);
    }
    
    rows.push(
      <tr 
        className="calendar-row" key={day}
        style={{height: `calc(100% /${weeksAmount}`}}>
          {row}
      </tr>
    )
  }

  return (
    <table className="calendar-body">
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}


export default Calendar;