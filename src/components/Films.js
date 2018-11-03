import React, { Component } from 'react';
import Header from './Header';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const Films = (props) => {
  const formatDate = (date) => (
    dateFns.format(date, 'D MMMM YYYY', { locale: ruLocale })
  )

  console.log(props);

    return (
      <div className="films-page">
        <Header showReturnLink={true}/>
        <section className="films-on-date">
          <div className="heading-date">
            <h3>{formatDate(props.selectedDate)}</h3>
          </div>

          <div className="films">
          {/* {console.log(props.films[+props.selectedDate].__proto__)} */}
            {/* {
              props.films[+props.selectedDate].map((film, i) => (
                <Film key={i} props={film.image, film.name, film.number, film.season} />
              ))
            } */}
          </div>

          <button className="more-films">

          </button>
        </section>
      </div>
    )
}

const Film = (props) => {

  return (
    <div className="film-item">
      <div className="film-img">
        <img src={props.image.medium}></img>
      </div>

      <h4 className="film-name">{props.name}</h4>

      <span className="film-year"></span>
      <div className="film-episode-pointer">
        <span className="film-season"></span>
        <span className="film-episode"></span>
      </div>
    </div>
  )
} 

export default Films;