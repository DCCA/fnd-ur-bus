import React from "react";

import { Link, NavLink } from "react-router-dom";

const Header = () => (
  <header className="flex items-center justify-center">
    <img className="logo m2" src="/assets/img/icon-bus.png"></img>
    <NavLink to="/">
      <h1 id="logo" className="h1 center">
        fnd ur bus
      </h1>
    </NavLink>
  </header>
);

export default Header;
