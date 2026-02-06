import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.scss';

// Import de tes pages
import Home from './pages/Home';
import Demande from './pages/Demande';
// import ArtisanDashboard from './pages/ArtisanDashboard';
// import ArtisanRegister from './pages/ArtisanRegister';
// import ArtisanLogin from './pages/ArtisanLogin';

//Import des composants
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/particulier/demande" element={<Demande />} />
          {/* <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
          <Route path="/artisan/register" element={<ArtisanRegister />} />
          <Route path="/artisan/login" element={<ArtisanLogin />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 