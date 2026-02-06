import React, { useState } from 'react';
import './DemandeForm.scss';

const DemandeForm = () => {
  // 1. États pour la navigation et les données
  const [step, setStep] = useState(1);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    metier: '',
    description: '',
    codePostal: '',
    nom: '',
    email: '',
    telephone: ''
  });

  // 2. Validation par étape
  const isStepValid = () => {
    if (step === 1) {
      return formData.metier !== '' && formData.description.trim().length >= 15;
    }
    if (step === 2) {
      // Vérifie si le code postal fait bien 5 chiffres
      return /^[0-9]{5}$/.test(formData.codePostal);
    }
    return true; 
  };

  // 3. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (isStepValid()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, on simulera l'envoi vers la base de données plus tard
    console.log("Données transmises :", formData);
    setIsSent(true);
  };

  // 4. Écran de succès après l'envoi
  if (isSent) {
    return (
      <div className="demande-card success-screen">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Demande enregistrée !</h2>
        <p>Merci <strong>{formData.nom}</strong>. Votre projet de {formData.metier} a été transmis aux artisans proches du {formData.codePostal}.</p>
        <button className="btn-home" onClick={() => window.location.href = '/'}>
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="demande-card">
      {/* Barre de progression */}
      <div className="progress-container">
        {[1, 2, 3].map((num) => (
          <React.Fragment key={num}>
            <div className={`step-circle ${step >= num ? 'active' : ''}`}>{num}</div>
            {num < 3 && <div className={`step-line ${step > num ? 'active' : ''}`}></div>}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ÉTAPE 1 : PROJET */}
        {step === 1 && (
          <div className="form-content fade-in">
            <h3>Décrivez votre besoin</h3>
            <div className="input-group">
              <label><i className="fas fa-tools"></i> Corps de métier</label>
              <select name="metier" value={formData.metier} onChange={handleChange}>
                <option value="">Sélectionnez un métier...</option>
                <option value="Maçonnerie">Maçonnerie</option>
                <option value="Plomberie">Plomberie</option>
                <option value="Électricité">Électricité</option>
                <option value="Peinture">Peinture</option>
                <option value="Menuiserie">Menuiserie</option>
              </select>
            </div>
            <div className="input-group">
              <label><i className="fas fa-comment-alt"></i> Détails des travaux</label>
              <textarea 
                name="description" 
                placeholder="Précisez l'ampleur des travaux, la surface, les matériaux..."
                value={formData.description}
                onChange={handleChange}
              />
              <small className={formData.description.length >= 15 ? 'valid' : ''}>
                {formData.description.length}/15 caractères minimum
              </small>
            </div>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={nextStep} 
              disabled={!isStepValid()}
            >
              Suivant <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : LOCALISATION */}
        {step === 2 && (
          <div className="form-content fade-in">
            <h3>Où se trouve le chantier ?</h3>
            <div className="input-group">
              <label><i className="fas fa-map-marker-alt"></i> Code Postal</label>
              <input 
                type="text" 
                name="codePostal" 
                placeholder="Ex: 33000"
                maxLength="5"
                value={formData.codePostal}
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button type="button" className="btn-secondary" onClick={prevStep}>Retour</button>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={nextStep} 
                disabled={!isStepValid()}
              >
                Suivant <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : CONTACT */}
        {step === 3 && (
          <div className="form-content fade-in">
            <h3>Vos coordonnées</h3>
            <div className="input-group">
              <input type="text" name="nom" placeholder="Nom et Prénom" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Adresse Email" onChange={handleChange} required />
              <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} required />
            </div>
            <div className="button-group">
              <button type="button" className="btn-secondary" onClick={prevStep}>Retour</button>
              <button type="submit" className="btn-submit">Envoyer ma demande</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DemandeForm;