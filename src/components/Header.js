import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLogoImg from './../images/header-img-text.png';

const Header = () => {
  return (
    <header className="app-header">
      <NavLink className="header-logo" to="/"><img src={HeaderLogoImg} alt=""/></NavLink>
    </header>
  )
}

export default Header;