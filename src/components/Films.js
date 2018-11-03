import React from 'react';
import Header from './Header';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import angleDown from './../images/angle-down.png';

const Films = (props) => {
  const formatDate = (date) => (
    dateFns.format(date, 'D MMMM YYYY', { locale: ruLocale })
  )

  const getFilms = (films, amount) => {
    let result = [];

    for (let i = 0; i < amount; i++) {
      result.push(
        <Film key={i}
          image={films[i].show.image}
          number={films[i].number}
          season={films[i].season}
          name={films[i].name}
          premiered={films[i].show.premiered}
        />
      );
    }

    return result;
  }

  // console.log(props);

  return (
    <div className="films-page">
      <Header showReturnLink={true} />
      <main className="films-page-content">
        <div className="heading-date container">
          <h3>{formatDate(props.selectedDate)}</h3>
        </div>

        <div className="films-container container">
          {getFilms(props.films[+props.selectedDate], 2)}
        </div>

        <div className="container">
          <button className="more-films">
            Еще 32 сериала
          <img src={angleDown} className="angle-down angle-down_margin-left" />
          </button>
        </div>
      </main>
    </div>
  )
}

const Film = (props) => {
  // const getCreationYear = (str) => str.slice(4)

  console.log(props);
  return (
    <div className="film-item">
      <div className="film-img">
        <img src={props.image.medium}></img>
      </div>

      <div className="film-text">
        <div className="film-text-top">
          <h4 className="film-name">{props.name}</h4>
          <span className="film-year"> {props.premiered.slice(0, 4)} </span>
        </div>

        <div className="film-episode-pointer">
          <span className="film-season film-season_margin-right">Сезон: {props.season} </span>
          <span className="film-episode">Эпизод: {props.number} </span>
        </div>
      </div>
    </div>
  )
}

export default Films;