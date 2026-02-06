import React from 'react';
import './Demande.scss';
import DemandeForm from '../components/DemandeForm';

const Demande = () => {
  return (
    // On utilise une classe consistante pour le style
    <section className="demande-section">
      <div className="container">
        <div className="section-header">
          <h1>Déposer une <span>demande</span></h1>
          <div className="underline"></div>
          <p>Décrivez votre projet pour recevoir des devis gratuits.</p>
        </div>

        <div className="demande-content">
          <DemandeForm />
        </div>
      </div>
    </section>
  );
};

export default Demande;