
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Récupérer l'utilisateur depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Affichage si l'utilisateur n'est pas connecté
  if (!user) {
    return (
      <div className="container mt-5">
        <h2>Veuillez vous connecter</h2>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Aller à la page de connexion
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2>Profil de {user.name}</h2>
      <div className="profile-header text-center">
        <div className="circle-avatar" style={{ fontSize: '2rem' }}>
          {user.email.charAt(0).toUpperCase()}
        </div>
        <h3>{user.name}</h3>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Type de compte :</strong> {user.type}</p>
        <Button variant="danger" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Profile;
