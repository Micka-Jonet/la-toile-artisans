import React from 'react';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1>Vos travaux en toute <br /><span>confiance.</span></h1>
        <p>Mise en relation directe avec les meilleurs artisans locaux rigoureusement sélectionnés.</p>
        <div className="hero__actions">
          <a href="#devis" className="btn btn--orange btn--lg">Lancer mon projet</a>
        </div>
      </div>
    </section>
  );
};
export default Hero;