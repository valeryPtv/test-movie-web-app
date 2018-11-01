import React, { Component } from 'react';
import Calendar from './Calendar';
import TVImg from './../images/home-TV.png';

const Home = (props) => {


  return (
    <div className="home-page">
      <div className="home-top">
        <div className="TV-img-container">
          <img src={TVImg} alt="TV" />
        </div>
        <p>Для получения списка сериалов, пожалуйста, выберите необходимый месяц и день</p>
      </div>
      
      <Calendar nextMonth={props.nextMonth} prevMonth={props.prevMonth} />
    </div>
  )
}

export default Home;