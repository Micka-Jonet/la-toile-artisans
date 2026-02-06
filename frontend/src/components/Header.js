import React, { useState } from 'react'; // 1. L'import doit être présent
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  // 2. La syntaxe correcte du Hook useState
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isMenuOpen ? 'header--open' : ''}`}>
      <div className="header__flex">
        <Link to="/" className="logo">
          <div className="logo__emblem"><i className="fas fa-house-chimney-window"></i></div>
          <div className="logo__text">La Toile <span>des Artisans</span></div>
        </Link>

        {/* Le burger qui déclenche l'état */}
        <div className={`burger ${isMenuOpen ? 'burger--active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <Link to="/demande" className="btn btn--orange" onClick={() => setIsMenuOpen(false)}>
            Déposer une demande
          </Link>
          <Link to="/espace-artisan" className="btn btn--outline" onClick={() => setIsMenuOpen(false)}>
            Espace Artisan
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;