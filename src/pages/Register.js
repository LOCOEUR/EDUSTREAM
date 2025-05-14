import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'normal',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find((u) => u.email === formData.email);
    if (userExists) {
      setMessage("Cet email est déjà utilisé.");
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    setMessage("Compte enregistré avec succès !");
  };

  const registerWithProvider = (provider) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const providerUser = users.find((u) => u.type === provider);
    if (providerUser) {
      setMessage(`Compte déjà enregistré avec ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`);
    } else {
      setMessage(`Compte enregistré avec ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Inscription</h2>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleRegister}>
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
          S'inscrire
        </button>
      </form>

      <hr />

      <div className="d-flex justify-content-center gap-3 mt-3">
        <button
          onClick={() => registerWithProvider('google')}
          className="outline-white d-flex align-items-center"
          
        >
          <i className="bi bi-google me-2"></i> Google
        </button>
        <button
          onClick={() => registerWithProvider('facebook')}
          className="outline-white d-flex align-items-center"
          
        >
          <i className="bi bi-facebook me-2"></i> Facebook
        </button>
      </div>

      
      <style>
        {`
          .outline-white {
            border: 1px solid white;
            background-color:rgb(2, 47, 73) ;
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

export default Register;
