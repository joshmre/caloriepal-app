import React from "react";
import { FaCalculator, FaUtensils } from "react-icons/fa6";
import { IoIosJournal } from "react-icons/io";
import { SiProbot } from "react-icons/si";

import { IoLogoReact } from "react-icons/io5"; //temp

const NavBar = () => {
  return (
    <nav className="navigation">
      <ul className="nav-bar">

        <li className="logo">
          <a href="/" className="nav-link">
            <span className="link-text logo-text"> CaloriePal </span>
            <FaUtensils />
          </a>
        </li>
        <li className="nav-item" key="jump">
          <a href="/settings" className="nav-link">
            <FaCalculator />
            <span className="link-text"> Calorie Calculator </span>
          </a>
        </li>

        <li className="nav-item" key="about-me">
          <a href="/logcals" className="nav-link">
            <IoIosJournal />
            <span className="link-text"> Calorie Log </span>
          </a>
        </li>

        <li className="nav-item" key="calendar">
          <a href="/calorieassistant" className="nav-link">
            <SiProbot />
            <span className="link-text"> AI Assistant </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;