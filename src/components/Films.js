import React, { Component } from 'react';
import Header from './Header';
import dateFns from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import angleDown from './../images/angle-down.png';
import angleUp from './../images/angle-up.png';
import Modal from './Modal/Modal';
import { withRouter } from 'react-router';

// class FilmsContainer extends Component {
//   state = {
//     films: {}
//   };

//   componentWillMount() {
//     const formatDate = (input) => dateFns.format(input, 'YYYY-MM-DD');
//     // URLSearchParams not supported in IE
//     const urlParams = new URLSearchParams(this.props.location.search);
//     const date = dateFns.parse(urlParams.get('date'));
//     this.props.setDate(date);
//     // previous day
//     const prevDay = dateFns.subDays(date, 1);
//     let filmsStorage = {};

//     const fetchFilms = (inputDate, store) => {
//       const formattedDate = formatDate(inputDate);
//       const address = `http://api.tvmaze.com/schedule?country=US&date=${formattedDate}`;

//       return fetch(address)
//         .then(response => response.json())
//         .then((response) => { store[formattedDate] = response })
//     }

//     const getAddress = (inputDate) => {
//       const formattedDate = formatDate(inputDate);
//       return `http://api.tvmaze.com/schedule?country=US&date=${formattedDate}`;
//     }

//     fetch(getAddress(date))
//       .then(response => response.json())
//       // .then((response) => { this.setState( { films: response } ) } );
//       .then(response => { filmsStorage[+date] = response })
//       .then(() => fetch(getAddress(prevDay)))
//       .then(response => response.json())
//       .then(response => { filmsStorage[+prevDay] = response })
//       .then(() => { this.setState(() => ({ films: filmsStorage })) })
//   }

//   render() {
//     console.log(this.props);
//     const formatDate = (date) => (
//       dateFns.format(date, 'D MMMM YYYY', { locale: ruLocale })
//     )

//     const getFilms = (dateList, amount) => {
//       let result = [];
//       Object.keys(dateList).forEach(filmsKey => {
//         let films = dateList[filmsKey];
//         for (let i = 0; i < amount; i++) {
//           result.push(
//             <Film key={filmsKey + i}
//               image={films[i].show.image}
//               number={films[i].number}
//               season={films[i].season}
//               name={films[i].name}
//               premiered={films[i].show.premiered}
//               isModalShown={this.props.isModalShown}
//               showModal={this.props.showModal}
//             />
//           );
//         }
//       })

//       return result;
//     }

//     return (
//       <div className="films-page">
//         <Header showReturnLink={true} />
//         <main className="films-page-content">
//           <div className="heading-date container">
//             <h3>{formatDate(this.props.selectedDate)}</h3>
//           </div>

//           <div className="films-container container">
//             {
//               Object.keys(this.state.films).length >= 1 ?
//                 getFilms(this.state.films, 2) : null
//             }
//           </div>

//           <div className="container">
//             <button className="more-films">
//               Еще 32 сериала
//             <img src={angleDown} className="angle-down angle-down_margin-left" alt="angle downg" />
//             </button>
//           </div>
//         </main>
//       </div>
//     )
//   }
// }

class FilmsContainer extends Component {
  state = {
    films: {}
  };

  componentWillMount() {
    const formatDate = (input) => dateFns.format(input, 'YYYY-MM-DD');
    // URLSearchParams not supported in IE
    const urlParams = new URLSearchParams(this.props.location.search);
    const date = dateFns.parse(urlParams.get('date'));
    this.props.setDate(date);
    // previous day
    const prevDay = dateFns.subDays(date, 1);
    let filmsStorage = {};

    const fetchFilms = (inputDate, store) => {
      const formattedDate = formatDate(inputDate);
      const address = `http://api.tvmaze.com/schedule?country=US&date=${formattedDate}`;

      return fetch(address)
        .then(response => response.json())
        .then((response) => { store[formattedDate] = response })
    }

    const getAddress = (inputDate) => {
      const formattedDate = formatDate(inputDate);
      return `http://api.tvmaze.com/schedule?country=US&date=${formattedDate}`;
    }

    fetch(getAddress(date))
      .then(response => response.json())
      // .then((response) => { this.setState( { films: response } ) } );
      .then(response => { filmsStorage[+date] = response })
      .then(() => fetch(getAddress(prevDay)))
      .then(response => response.json())
      .then(response => { filmsStorage[+prevDay] = response })
      .then(() => { this.setState(() => ({ films: filmsStorage })) })
  }

  render() {
    let filmsKeys = Object.keys(this.state.films);

    return (
      <div className="films-page">
        <Header showReturnLink={true} />
        <main className="films-page-content">
          {
            filmsKeys.map((filmsKey, i) => {
              let films = this.state.films[filmsKey];
              return <FilmsOnDate key={i} films={films} date={new Date(+filmsKey)} />
            })
          }
        </main>
      </div>
    )
  }
}


class FilmsOnDate extends Component {
  state = {
    shownFilms: [...this.props.films.slice(0, 2)]
  }

  render() {
    const { date, films } = this.props;
    let button;

    const formatDate = (date) => (
      dateFns.format(date, 'D MMMM YYYY', { locale: ruLocale })
    )

    // const renderFilms = () => {
    //   return this.state.shownFilms.map((film, i) => (
    //     <Film key={date + i}
    //       image={film.show.image}
    //       number={film.number}
    //       season={film.season}
    //       name={film.name}
    //       premiered={films[i].show.premiered}
    //     />
    //   ))
    // }

    const showFilms = () => {
      // debugger;
      let filmsToShow = this.state.shownFilms.length > 2 ?
        this.props.films.slice(0, 2) : this.props.films;

      this.setState({shownFilms: [...filmsToShow]}, () => { console.log(this.state) } )
    } 

    if (this.state.shownFilms.length > 2) {
      button = (
        <button className="more-films" onClick={showFilms}>
          Показать основные
          <img src={angleDown} className="angle-down angle-down_margin-left" alt="angle down" />
        </button>
      )
    } else {
      button = (
        <button className="more-films" onClick={showFilms}>
          Еще {films.length - 2} сериала
        <img src={angleDown} className="angle-down angle-down_margin-left" alt="angle down" />
        </button>
      )
    }

    return (
      <div className="films-container">
        <div className="heading-date container">
          <h3>{formatDate(this.props.date)}</h3>
        </div>
        <div className="films-list">
          {
            this.state.shownFilms.map((film, i) => (
              <Film key={date + i}
                image={film.show.image}
                number={film.number}
                season={film.season}
                name={film.name}
                premiered={films[i].show.premiered}
              />
            ))
          }
          {button}
        </div>
      </div>
    )
  }
}

{/* const FilmsOnDate = (props) => {
  const { films, date } = props;
  console.log(date);

  const formatDate = (date) => (
    dateFns.format(date, 'D MMMM YYYY', { locale: ruLocale })
  )

  let result = [];
  let amount = 2;

  for (let i = 0; i < amount; i++) {
    result.push(
      <Film key={date + i}
        image={films[i].show.image}
        number={films[i].number}
        season={films[i].season}
        name={films[i].name}
        premiered={films[i].show.premiered}
      />
    );
  }

  return (
    <div className="films-container">
      <div className="heading-date container">
        <h3>{formatDate(props.date)}</h3>
      </div>
      <div className="films-list">
        {result}
        <button className="more-films">
          Еще { films.length - 2 } сериала
            <img src={angleDown} className="angle-down angle-down_margin-left" alt="angle downg" />
        </button>
      </div>
    </div>
  )
} */}

class Film extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalShown: false
    }

    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({ isModalShown: !this.state.isModalShown })
  }

  render() {
    return (
      <div className="film-item">
        <FilmImage isModalShown={this.state.isModalShown} image={this.props.image} showModal={this.showModal} />
        <div className="film-text">
          <div className="film-text-top">
            <h4 className="film-name">{this.props.name}</h4>
            <span className="film-year"> {this.props.premiered.slice(0, 4)} </span>
          </div>

          <div className="film-episode-pointer">
            <span className="film-season film-season_margin-right">Сезон: {this.props.season} </span>
            <span className="film-episode">Эпизод: {this.props.number} </span>
          </div>
        </div>
      </div>
    )
  }
}

const FilmImage = (props) => {
  // {debugger}
  return (
    <div className="film-img" onClick={props.showModal}>
      <img src={props.image ? props.image.medium : ""} className="film-img__medium" alt="movie" />
      {
        props.isModalShown === true ?
          <Modal showModal={props.showModal}>
            <img src={props.image.original} className="modal-img" alt="movie large" />
          </Modal>
          : null
      }
    </div>
  )
}


export default withRouter(FilmsContainer);