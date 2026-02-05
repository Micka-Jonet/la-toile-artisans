import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      {/* Section de test pour voir le défilement */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: '#fff' }}>
        <div className="container">
          <h2>Nos services</h2>
          <p>Ici commencera la suite de ton site (Cartes, services, etc.)</p>
          <div style={{ height: '500px' }}></div> {/* Juste pour scroller */}
        </div>
      </section>
    </div>
  );
};

export default Home;