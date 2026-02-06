import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtisanRegister from '../components/ArtisanRegister';
import './ArtisanLogin.scss';

const ArtisanLogin = () => {
  const navigate = useNavigate();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour l'œil
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!loginData.email) tempErrors.email = "L'email est requis";
    else if (!emailRegex.test(loginData.email)) tempErrors.email = "Email invalide";
    if (!loginData.password) tempErrors.password = "Le mot de passe est requis";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({ 
      ...loginData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoggingIn(true);
      setTimeout(() => {
        setIsLoggingIn(false);
        setLoginSuccess(true);
        setTimeout(() => {
          navigate('/artisan/dashboard');
        }, 2500);
      }, 1500);
    }
  };

  return (
    <div className="artisan-page">
      <div className="artisan-page__container">
        
        {!isRegistering ? (
          <div className="auth-card fade-in">
            {loginSuccess ? (
              <div className="success-state fade-in">
                <div className="success-icon"><i className="fas fa-check-circle"></i></div>
                <h3>Connexion réussie !</h3>
                <p>Content de vous revoir Micka.</p>
                <div className="loader-line-container">
                  <div className="loader-line-bar"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="auth-card__header">
                  <h2>Espace <span>Artisan</span></h2>
                  <p>Gérez vos chantiers et vos devis</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
                  <div className={`input-group ${errors.email ? 'error' : ''}`}>
                    <label>Email Professionnel</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="nom@entreprise.fr" 
                      value={loginData.email}
                      onChange={handleInputChange} 
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>

                  <div className={`input-group ${errors.password ? 'error' : ''}`}>
                    <label>Mot de passe</label>
                    <div className="password-wrapper">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="••••••••" 
                        value={loginData.password}
                        onChange={handleInputChange} 
                      />
                      <button 
                        type="button" 
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                      </button>
                    </div>
                    {errors.password && <span className="error-msg">{errors.password}</span>}
                  </div>

                  <div className="login-extras">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        name="rememberMe" 
                        checked={loginData.rememberMe}
                        onChange={handleInputChange} 
                      />
                      <span className="checkmark"></span>
                      Se souvenir de moi
                    </label>
                    <a href="#forgot" className="forgot-link">Oublié ?</a>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn-login ${isLoggingIn ? 'loading' : ''}`}
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? 'Vérification...' : 'Se connecter'}
                  </button>
                </form>

                <div className="auth-card__footer">
                  <p>Pas encore inscrit ?</p>
                  <button className="btn-toggle" onClick={() => setIsRegistering(true)}>
                    Inscrire mon entreprise
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="register-wrapper fade-in">
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

export default ArtisanLogin;