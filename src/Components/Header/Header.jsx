import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

//---------------------------------------------------------------------------

export const Header = () => {
  return (
    <header className="navbar">
      <nav className="navbar__top">
        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link className="navbar__link" href="/">
              Chapters
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" href="/">
              Characters
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" href="/">
              Information
            </Link>
          </li>
        </ul>
      </nav>
      {/* <img
        src="../../../img/ramLetters.png"
        alt="Logo"
        className="navbar_logo"
      /> */}
    </header>
  );
};
