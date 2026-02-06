import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtisanRegister.scss';

const ArtisanRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    siret: '',
    companyName: '',
    address: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    if (formData.siret.length === 14) {
      handleSiretCheck();
    }
  }, [formData.siret]);

  const handleSiretCheck = async () => {
    setIsVerifying(true);
    setErrors({});
    try {
      const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${formData.siret}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const siege = result.matching_etablissements?.[0] || result.siege;
        if (result.etat_administratif === 'A') {
          setFormData(prev => ({
            ...prev,
            companyName: result.nom_complet,
            address: siege.adresse_complete || "Adresse non communiquée"
          }));
          setTimeout(() => { setIsVerifying(false); setStep(2); }, 1000);
        } else {
          setErrors({ siret: "Entreprise fermée ou inactive." });
          setIsVerifying(false);
        }
      } else {
        setErrors({ siret: "SIRET inconnu." });
        setIsVerifying(false);
      }
    } catch (error) {
      setErrors({ siret: "Erreur service public." });
      setIsVerifying(false);
    }
  };

  // --- NOUVELLE LOGIQUE DE VALIDATION ---
  const validateStep2 = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Veuillez entrer un email valide.";
    }
    if (formData.phone.length !== 10) {
      tempErrors.phone = "Le numéro doit comporter 10 chiffres.";
    }
    if (formData.password.length < 8) {
      tempErrors.password = "Le mot de passe doit faire au moins 8 caractères.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;
    if (name === 'siret' || name === 'phone') cleanValue = value.replace(/\D/g, '');
    
    setFormData({ ...formData, [name]: cleanValue });
    // On efface l'erreur du champ dès que l'utilisateur modifie
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="register-container success-view fade-in">
        <div className="success-icon"><i className="fas fa-check-circle"></i></div>
        <h2>Inscription validée !</h2>
        <p>Merci <strong>{formData.companyName}</strong>. <br/>Bienvenue sur La toile des artisans.</p>
        <button className="btn-finish" onClick={() => navigate('/artisan/dashboard')}>Dashboard</button>
      </div>
    );
  }

  return (
    <div className="register-container fade-in">
      <div className="step-indicator">
        <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step-line ${step === 2 ? 'active' : ''}`}></div>
        <div className={`step-circle ${step === 2 ? 'active' : ''}`}>2</div>
      </div>

      {step === 1 ? (
        <div className="step-content">
          <div className="register-header">
            <h2>Espace <span>Pro</span></h2>
            <p>Vérification de votre SIRET</p>
          </div>
          <div className={`input-group ${errors.siret ? 'error' : ''}`}>
            <label>N° SIRET</label>
            <input 
              type="text" name="siret" placeholder="Ex: 47976684200724" 
              maxLength="14" value={formData.siret} onChange={handleInputChange}
            />
            {errors.siret && <span className="error-msg">{errors.siret}</span>}
            {isVerifying && <div className="verifying-tag"><div className="spinner"></div> Analyse...</div>}
          </div>
        </div>
      ) : (
        <div className="step-content">
          <div className="register-header">
            <h2>Vos <span>Coordonnées</span></h2>
            <p>{formData.companyName}</p>
          </div>
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <label>Email Professionnel</label>
              <input 
                type="email" name="email" placeholder="contact@pro.fr" 
                value={formData.email} onChange={handleInputChange} 
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className={`input-group ${errors.phone ? 'error' : ''}`}>
              <label>Téléphone (10 chiffres)</label>
              <input 
                type="tel" name="phone" placeholder="0612345678" 
                maxLength="10" value={formData.phone} onChange={handleInputChange} 
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
            </div>

            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <label>Mot de passe (8 car. min)</label>
              <input 
                type="password" name="password" placeholder="••••••••" 
                value={formData.password} onChange={handleInputChange} 
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            <button type="submit" className="btn-submit">Créer mon compte</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ArtisanRegister;