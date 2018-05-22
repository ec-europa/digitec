import React from 'react';
import Link from 'gatsby-link';

import logo from '../img/DIGITEC-2018_3-institutions.png';

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <figure className="image">
            <img src={logo} alt="DIGITEC 2018" style={{ width: '240px' }} />
          </figure>
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="navbar-item" to="/about">
          Speakers
        </Link>
        <Link className="navbar-item" to="/about">
          Programme
        </Link>
        <Link className="navbar-item" to="/about">
          Expo
        </Link>
        <Link className="navbar-item" to="/about">
          Gallery
        </Link>
        <Link className="navbar-item" to="/about">
          Practical
        </Link>
        <Link className="navbar-item" to="/about">
          Newsletter
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
