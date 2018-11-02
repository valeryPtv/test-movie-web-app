import React from 'react';
import Calendar from './Calendar';
import TVImg from './../images/home-TV.png';
import Header from './Header';

const Home = (props) => {
  return (
    <div className="home-page">
      <Header />
      <div className="home-page-content">
        <div className="home-top">
          <div className="TV-img-container">
            <img src={TVImg} alt="TV" />
          </div>
          <p>Для получения списка сериалов, пожалуйста, выберите необходимый месяц и день</p>
        </div>

        <Calendar {...props} />
      </div>
    </div>
  )
}

export default Home;