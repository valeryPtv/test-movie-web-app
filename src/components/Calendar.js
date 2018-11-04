import React from 'react';
import angleLeft from './../images/angle-left.svg';
import angleRight from './../images/angle-right.svg';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
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

CalendarHeader.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  selectedMonth: PropTypes.object.isRequired
}

const CalendarBody = (props) => {
  const { selectedMonth, selectedDate, setDateAndFetch, setDate } = props;
  const monthStart = dateFns.startOfMonth(selectedMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);
  let weeksAmount = dateFns.differenceInCalendarWeeks(endDate, startDate) + 1;
  const dateFormat = 'D';
  const formatDate = (input) => dateFns.format(input, 'YYYY-MM-DD');
  
  let day = startDate;
  let rows = [];
  
  while (day <= endDate) {
    let row = [];
    
    for (let i = 0; i < 7; i++) {
      let dayCopy = day;

      // const linkHandler = (e) => {
      //   e.preventDefault(); 
      //   setDateAndFetch(dayCopy)
      // }


      row.push(
        <td key={i} 
          className={`calendar-cell ${
            dateFns.isSameMonth(day, monthStart) ?
            (dateFns.isSameDay(day, selectedDate) ? 'selected-cell' : '') : 'disabled-cell'
            }`
          }
        >
          <NavLink to={`/schedule?country=US&date=${formatDate(dayCopy)}`} className="film-link" onClick={setDate}> {dateFns.format(day, dateFormat)} </NavLink>
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

CalendarBody.propTypes = {
  selectedMonth: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  setDateAndFetch: PropTypes.func
}

export default Calendar;