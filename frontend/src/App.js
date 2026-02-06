import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import './App.scss';

// Import de tes pages
import Home from './pages/Home';
import Demande from './pages/Demande';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ArtisanLogin from './pages/ArtisanLogin';

// Import des composants
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  // On vérifie si on est sur la page Dashboard
  const isDashboard = location.pathname === '/artisan/dashboard';

  return (
    <div className="App">
      {/* On n'affiche le Header que si on n'est PAS sur le dashboard */}
      {!isDashboard && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/particulier/demande" element={<Demande />} />
          <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
          <Route path="/artisan/login" element={<ArtisanLogin />} /> 
        </Routes>
      </main>

      {/* On n'affiche le Footer que si on n'est PAS sur le dashboard */}
      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;