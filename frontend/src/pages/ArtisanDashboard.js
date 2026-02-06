import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtisanDashboard.scss';

const ArtisanDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggingOut, setIsLoggingOut] = useState(false); // État pour la simulation
  
  const [artisanInfo] = useState({
    companyName: "Micka Rénovation Pro",
    siret: "123 456 789 00012",
    rating: 4.9,
    reviewsCount: 18,
    profilePic: "https://ui-avatars.com/api/?name=Micka+BTP&background=E74C3C&color=fff"
  });

  const [requests] = useState([
    { id: 1, client: "Jean Dupont", project: "Pose Carrelage 30m²", date: "Hier", budget: "1200€" },
    { id: 2, client: "Marie Leroy", project: "Rénovation SDB", date: "Il y a 2h", budget: "4500€" },
    { id: 3, client: "Lucas Bernard", project: "Peinture Salon", date: "Aujourd'hui", budget: "850€" }
  ]);

  // Fonction de déconnexion simulée
  const handleLogout = () => {
    setIsLoggingOut(true);
    // Petite pause pour simuler la fermeture de session
    setTimeout(() => {
      navigate('/'); // Retour à l'accueil
    }, 1500);
  };

  if (isLoggingOut) {
    return (
      <div className="logout-overlay fade-in">
        <div className="logout-content">
          <div className="loader-spinner"></div>
          <p>Déconnexion en cours...</p>
          <span>À bientôt, Micka !</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        
        <aside className="sidebar">
          <div className="sidebar__logo">
            <i className="fas fa-star"></i> L'Étoile <span>des Artisans</span>
          </div>
          
          <nav className="sidebar__nav">
            <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
              <i className="fas fa-th-large"></i> Tableau de bord
            </button>
            <button><i className="fas fa-hammer"></i> Mes Chantiers</button>
            <button><i className="fas fa-file-invoice-dollar"></i> Devis & Factures</button>
            <button><i className="fas fa-comment-dots"></i> Avis Clients</button>
            <button><i className="fas fa-user-cog"></i> Mon Entreprise</button>
          </nav>

          <div className="sidebar__footer">
            <button className="btn-logout" onClick={handleLogout}>
              <i className="fas fa-power-off"></i> Déconnexion
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          
          <section className="profile-card fade-in">
            <div className="profile-content">
              <div className="avatar-section">
                <img src={artisanInfo.profilePic} alt="Profil" />
                <label htmlFor="file-upload" className="edit-overlay">
                  <i className="fas fa-pen"></i>
                </label>
                <input id="file-upload" type="file" style={{display: 'none'}} />
              </div>
              
              <div className="info-section">
                <div className="title-row">
                  <h1>{artisanInfo.companyName}</h1>
                  <span className="siret-badge">SIRET: {artisanInfo.siret}</span>
                </div>
                
                <div className="rating-row">
                  <div className="stars-group">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={i < Math.floor(artisanInfo.rating) ? "fas fa-star" : "far fa-star"}></i>
                    ))}
                    <span className="note">{artisanInfo.rating} / 5</span>
                  </div>
                  <span className="separator">|</span>
                  <button className="reviews-link">{artisanInfo.reviewsCount} avis vérifiés</button>
                </div>
              </div>
            </div>
          </section>

          <section className="requests-container fade-in">
            <div className="section-header">
              {/* Suppression du filtre "Urgentes" ici */}
              <h2><i className="fas fa-envelope-open-text"></i> Demandes en attente</h2>
              <span className="count-label">{requests.length} nouvelles demandes</span>
            </div>

            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Type de travaux</th>
                    <th>Reçu le</th>
                    <th>Budget estimé</th>
                    <th className="text-right">Décision</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td className="client-cell">
                        <div className="client-icon">{req.client.charAt(0)}</div>
                        <strong>{req.client}</strong>
                      </td>
                      <td>{req.project}</td>
                      <td>{req.date}</td>
                      <td><span className="price">{req.budget}</span></td>
                      <td>
                        <div className="actions-group">
                          <button className="btn-action view"><i className="fas fa-search"></i> Aperçu</button>
                          <button className="btn-action accept"><i className="fas fa-check"></i></button>
                          <button className="btn-action refuse"><i className="fas fa-times"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ArtisanDashboard;