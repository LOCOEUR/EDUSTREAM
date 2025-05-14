

import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const findUser = (email, password, type = 'normal') => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.type === type
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = findUser(formData.email, formData.password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setMessage('Connexion réussie !');
      window.location.reload(); 
    } else {
      setMessage("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  const loginWithProvider = (provider) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.type === provider);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setMessage(`Connecté avec ${provider.charAt(0).toUpperCase() + provider.slice(1)} (${user.email})`);
    } else {
      setMessage(`Aucun compte ${provider} enregistré.`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Connexion</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Se connecter
        </button>
      </form>

      <hr />

      <div className="d-flex justify-content-center gap-3 mt-3">
        <button
          onClick={() => loginWithProvider('google')}
          className="outline-white d-flex align-items-center"
          
        >
          <i className="bi bi-google me-2"></i> Google
        </button>
        <button
          onClick={() => loginWithProvider('facebook')}
          className="outline-white d-flex align-items-center"
          
        
        >
          <i className="bi bi-facebook me-2"></i> Facebook
        </button>
      </div>

      
      <style>
        {`
          .outline-white {
            border: 1px solid white;
            background-color:rgb(2, 47, 73);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .outline-white:hover {
            background-color: #f39c12;
            border-color: #f39c12;
            color: white;
          }

        `}
      </style>
    </div>
  );
};

export default Login;

