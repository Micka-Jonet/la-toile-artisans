import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__flex">
        <Link to="/" className="logo">
          <div className="logo__emblem"><i className="fas fa-house-chimney-window"></i></div>
          <div className="logo__text">La Toile <span>des Artisans</span></div>
        </Link>
        <nav className="header__nav">
          <Link to="/demande" className="btn btn--orange">Déposer une demande</Link>
          <Link to="/espace-artisan" className="btn btn--outline">Espace Artisan</Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;