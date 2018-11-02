import React from 'react';
import { NavLink } from 'react-router-dom';
import angleLeft from './../images/angle-left-red.png';

const Header = (props) => {
  return (
    <header className="app-header">
      {
        props.showReturnLink === true ? 
          <NavLink className="return-link angle" to="/"><img src={angleLeft}/></NavLink> : null
      }
      <NavLink className="header-logo" to="/">super film</NavLink>
    </header>
  )
}

export default Header;