import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

//---------------------------------------------------------------------------

export const Header = () => {
  return (
    <header className="navbar">
      <nav className="navbar__top">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <NavLink
              to="/episodes"
              className={({ isActive }) => 
              isActive ? "navbar__link active-link" : "navbar__link"
              } 
              >
              Episodes
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink 
              to="/"
              className={({ isActive }) =>
              isActive ? "navbar__link active-link" : "navbar__link"
              }
              >
              Characters
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink 
              to="/info"
              className={({ isActive }) =>
              isActive ? "navbar__link active-link" : "navbar__link" 
              }
              >
              Information
            </NavLink>
          </li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;