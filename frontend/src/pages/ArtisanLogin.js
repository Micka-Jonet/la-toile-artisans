import React, { useState } from 'react';
import ArtisanRegister from '../components/ArtisanRegister';
import './ArtisanLogin.scss';

const ArtisanPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!loginData.email) tempErrors.email = "L'email est obligatoire";
    else if (!emailRegex.test(loginData.email)) tempErrors.email = "Format invalide";
    if (!loginData.password) tempErrors.password = "Le mot de passe est requis";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoggingIn(true);
      
      // Simulation d'un appel API (2 secondes)
      setTimeout(() => {
        setIsLoggingIn(false);
        setLoginSuccess(true);
        console.log("Connexion réussie !");
        
        // Optionnel : Redirection après 2 secondes
        // setTimeout(() => { window.location.href = '/dashboard'; }, 2000);
      }, 2000);
    }
  };

  return (
    <div className="artisan-page">
      <div className="artisan-page__container">
        {!isRegistering ? (
          <div className="auth-card fade-in">
            {loginSuccess ? (
              /* MESSAGE DE SUCCÈS */
              <div className="success-state fade-in">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Connexion réussie !</h3>
                <p>Ravi de vous revoir. Préparation de votre tableau de bord...</p>
                <div className="loader-line"></div>
              </div>
            ) : (
              /* FORMULAIRE DE CONNEXION */
              <>
                <div className="auth-card__header">
                  <h2>Espace <span>Artisan</span></h2>
                  <p>Accédez à votre compte professionnel</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
                  <div className={`input-group ${errors.email ? 'error' : ''}`}>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="nom@entreprise.fr" onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>

                  <div className={`input-group ${errors.password ? 'error' : ''}`}>
                    <label>Mot de passe</label>
                    <input type="password" name="password" placeholder="••••••••" onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                    {errors.password && <span className="error-msg">{errors.password}</span>}
                  </div>

                  <button type="submit" className={`btn-login ${isLoggingIn ? 'loading' : ''}`} disabled={isLoggingIn}>
                    {isLoggingIn ? 'Connexion en cours...' : 'Se connecter'}
                  </button>
                </form>

                <div className="auth-card__footer">
                  <p>Pas encore partenaire ?</p>
                  <button className="btn-toggle" onClick={() => setIsRegistering(true)}>Inscrire mon entreprise</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="fade-in">
            <ArtisanRegister />
            <div className="register-back">
              <button onClick={() => setIsRegistering(false)}>
                <i className="fas fa-arrow-left"></i> Retour à la connexion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanPage;