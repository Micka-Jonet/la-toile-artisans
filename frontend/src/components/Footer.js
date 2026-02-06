import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          
          {/* Colonne 1 : Branding */}
          <div className="footer__col">
            <Link to="/" className="footer__logo">
              <div className="logo__emblem"><i className="fas fa-house-chimney-window"></i></div>
              <div className="logo__text">La Toile <span>des Artisans</span></div>
            </Link>
            <p className="footer__desc">
              La première plateforme de mise en relation entre particuliers et artisans qualifiés. 
              Simplifiez vos travaux dès aujourd'hui.
            </p>
            <div className="footer__socials">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div className="footer__col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/services">Nos métiers</Link></li>
              <li><Link to="/artisan/register">Devenir partenaire</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact & Infos */}
          <div className="footer__col">
            <h4>Contact</h4>
            <ul className="footer__contact-info">
              <li><i className="fas fa-envelope"></i> contact@latoiledesartisans.fr</li>
              <li><i className="fas fa-phone"></i> 01 23 45 67 89</li>
              <li><i className="fas fa-location-dot"></i> Paris, France</li>
            </ul>
          </div>

        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} La Toile des Artisans. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;