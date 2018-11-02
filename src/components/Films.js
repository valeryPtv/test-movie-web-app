import React, { Component } from 'react';
import Header from './Header';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const Films = (props) => {
  const formatDate = (date) => (
    dateFns.format(date, 'D MMMM YYYY', { locale: ruLocale })
  )

    return (
      <div className="films-page">
        <Header showReturnLink={true}/>
        <section className="films-on-date">
          <div className="heading-date">
            <h3>{formatDate(props.selectedDate)}</h3>
          </div>

          <div className="films">
          
          </div>

          <button className="more-films">

          </button>
        </section>
      </div>
    )
}

export default Films;