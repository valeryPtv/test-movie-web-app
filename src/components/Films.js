import React from 'react';
import Header from './Header';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import angleDown from './../images/angle-down.png';
import Modal from './Modal/Modal';

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
          modalState={props.modalState}
          showModal={props.showModal}
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

  return (
    <div className="film-item">
      <FilmImage image={props.image} showModal={props.showModal} />
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

const FilmImage = (props) => {
  // console.log(props);
  let showModalTarget;

  const imageOnClick = (e) => {
    e.persist();
    props.showModal(e.target)
  } 

  return (
      <div className="film-img" onClick={ imageOnClick } ref={(node) => { showModalTarget = node; console.log(showModalTarget) }}>
        <img src={props.image.medium} className="film-img__medium"/>
        {props.modalState === showModalTarget ?
          <Modal showModal={props.showModal}> <img src={props.image.original} className="modal-img"/> </Modal> : null
        }
      </div>
  )
}

export default Films;