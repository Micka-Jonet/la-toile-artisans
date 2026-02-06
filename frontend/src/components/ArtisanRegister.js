import React, { useState } from 'react';
import './ArtisanRegister.scss';

const ArtisanRegister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    siret: '',
    category: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    
    // Validation Nom Entreprise
    if (formData.companyName.trim().length < 2) {
      tempErrors.companyName = "Le nom doit contenir au moins 2 caractères";
    }

    // Validation SIRET (14 chiffres exacts)
    if (!/^\d{14}$/.test(formData.siret)) {
      tempErrors.siret = "Le SIRET doit contenir exactement 14 chiffres";
    }

    // Validation Métier
    if (!formData.category) {
      tempErrors.category = "Veuillez choisir votre corps de métier";
    }

    // Validation Email Pro
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Format d'email professionnel invalide";
    }

    // Validation Téléphone (Format français 10 chiffres)
    const phoneRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      tempErrors.phone = "Numéro de téléphone invalide (10 chiffres requis)";
    }

    // Validation Mot de passe
    if (formData.password.length < 8) {
      tempErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Nettoyer l'erreur dès que l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      console.log("Données envoyées :", formData);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="register-success fade-in">
        <div className="success-icon"><i className="fas fa-check-double"></i></div>
        <h2>Demande d'inscription reçue !</h2>
        <p>Micka, ton entreprise <strong>{formData.companyName}</strong> est en cours de validation.</p>
        <p>Tu vas recevoir un email de confirmation sous peu.</p>
        <button onClick={() => window.location.reload()} className="btn-finish">Retour à la connexion</button>
      </div>
    );
  }

  return (
    <div className="register-container fade-in">
      <div className="register-header">
        <h2>Inscrire mon <span>entreprise</span></h2>
        <p>Accédez à des chantiers qualifiés près de chez vous</p>
      </div>

      <form onSubmit={handleSubmit} className="register-form" noValidate>
        <div className="form-grid">
          
          <div className="form-section">
            <div className={`input-group ${errors.companyName ? 'error' : ''}`}>
              <label>Nom de l'entreprise</label>
              <input type="text" name="companyName" placeholder="ex: Micka Plomberie" onChange={handleChange} />
              {errors.companyName && <span className="err-txt">{errors.companyName}</span>}
            </div>

            <div className={`input-group ${errors.siret ? 'error' : ''}`}>
              <label>N° SIRET</label>
              <input type="text" name="siret" placeholder="123 456 789 00012" maxLength="14" onChange={handleChange} />
              {errors.siret && <span className="err-txt">{errors.siret}</span>}
            </div>

            <div className={`input-group ${errors.category ? 'error' : ''}`}>
              <label>Métier principal</label>
              <select name="category" onChange={handleChange}>
                <option value="">Sélectionnez...</option>
                <option value="macon">Maçonnerie</option>
                <option value="plomberie">Plomberie</option>
                <option value="electricite">Électricité</option>
                <option value="peinture">Peinture</option>
              </select>
              {errors.category && <span className="err-txt">{errors.category}</span>}
            </div>
          </div>

          <div className="form-section">
            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <label>Email Professionnel</label>
              <input type="email" name="email" placeholder="contact@entreprise.fr" onChange={handleChange} />
              {errors.email && <span className="err-txt">{errors.email}</span>}
            </div>

            <div className={`input-group ${errors.phone ? 'error' : ''}`}>
              <label>Téléphone</label>
              <input type="tel" name="phone" placeholder="06 00 00 00 00" onChange={handleChange} />
              {errors.phone && <span className="err-txt">{errors.phone}</span>}
            </div>

            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <label>Mot de passe</label>
              <input type="password" name="password" placeholder="8 caractères min." onChange={handleChange} />
              {errors.password && <span className="err-txt">{errors.password}</span>}
            </div>
          </div>

        </div>

        <button type="submit" className={`btn-submit ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
          {isSubmitting ? 'Envoi en cours...' : 'Valider mon inscription pro'}
        </button>
      </form>
    </div>
  );
};

export default ArtisanRegister;