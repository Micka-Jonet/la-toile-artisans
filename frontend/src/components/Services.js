import React from 'react';
import './Services.scss';

const Services = () => {
  // On centralise les données pour pouvoir en ajouter facilement
  const servicesList = [
    { title: "Maçonnerie", icon: "fa-hammer", text: "Murs, dalles et gros œuvre pour vos projets." },
    { title: "Plomberie", icon: "fa-faucet", text: "Installation, dépannage et entretien sanitaire." },
    { title: "Électricité", icon: "fa-bolt", text: "Mise aux normes et installations électriques." },
    { title: "Peinture", icon: "fa-paint-roller", text: "Rénovation intérieure et finitions soignées." },
    { title: "Menuiserie", icon: "fa-hammer", text: "Pose de fenêtres, portes et parquets." },
    { title: "Toiture", icon: "fa-house-chimney", text: "Entretien, isolation et réfection de toiture." }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Nos corps de <span>métier</span></h2>
          <div className="underline"></div>
        </div>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-circle">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#" className="service-link">
                Découvrir <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;