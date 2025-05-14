

import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SiteNavbar = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Pour gérer l'ouverture/fermeture de la navbar latérale

  useEffect(() => {
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const getInitial = () => {
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return '?';
  };

  // Fonction pour basculer l'état de la navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour fermer la navbar latérale
  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        .navbar-dark .navbar-nav .nav-link,
        .navbar-dark .navbar-brand,
        .navbar-dark .dropdown-toggle {
          color: white !important;
          transition: color 0.3s ease;
        }

        .navbar-dark .navbar-nav .nav-link:hover,
        .navbar-dark .dropdown-toggle:hover {
          color: #f39c12 !important;
        }

        .btn-outline-white {
          border: 1px solid white;
          color: white;
          background-color: transparent;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .btn-outline-white:hover {
          background-color: #f39c12;
          color: white;
          border-color: #f39c12;
        }

        .circle-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #f39c12;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          cursor: pointer;
        }

        /* Style pour la navbar latérale */
        .navbar-slide {
          position: fixed;
          top: 0;
          right: -250px; /* Commence en dehors de la page */
          width: 250px;
          height: 100%;
          background-color: #333;
          color: white;
          transition: right 0.3s ease;
            z-index: 1000;
        }

        .navbar-slide.open {
          right: 0; /* Slide de droite à gauche */
        }

        .navbar-item {
          padding: 20px;
          border-bottom: 1px solid #444;
        }

        .navbar-item:hover {
          background-color: #555;
        }

        .profile-avatar {
  text-align: center;
}

.circle-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f39c12;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 auto;
  cursor: pointer;
}
  

      `}</style>

      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand href="/">🎓 EduStream</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Accueil</Nav.Link>
            </Nav>

            <Form className="d-flex mx-auto" style={{ width: "60%" }} onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Rechercher une vidéo..."
                className="me-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-white" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </Form>

            <Nav className="align-items-center">
              <NavDropdown title={<i className="me-2 bi bi-ui-checks-grid me-1"></i>}>
                {["Informatique", "Mathématiques", "Physique", "Chimie", "Histoire", "Géographie", "Français", "SVT", "Économie"].map((cat, index) => (
                  <NavDropdown.Item key={index} href={`/category/${cat}`}>
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              {user ? (
                <>
                  <Nav.Link href="/createvideo">
                    <Button variant="outline-white" className="me-2 d-flex align-items-center">
                      <i className="bi bi-upload me-1"></i> Créer une vidéo
                    </Button>
                  </Nav.Link>
                  <Nav.Link  onClick={toggleNavbar}>
                    <div className="circle-avatar">{getInitial()}</div>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">
                    <Button variant="outline-white" className="me-2 d-flex align-items-center">
                      <i className="bi bi-box-arrow-in-right me-1"></i> Connexion
                    </Button>
                  </Nav.Link>
                  <Nav.Link href="/register">
                    <Button variant="outline-white" className="d-flex align-items-center">
                      <i className="bi bi-person-plus me-1"></i> Inscription
                    </Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={`navbar-slide ${isOpen ? 'open' : ''}`}>
  <div className="navbar-item close-btn" onClick={() => setIsOpen(false)}>
    <i className="bi bi-x-lg"></i>
  </div>

  <div className="navbar-item profile-avatar" style={{ position: 'relative' }}>
    <div className="circle-avatar-large">{getInitial()}</div>
    <i
      className="bi bi-x-circle-fill"
      style={{
        position: 'absolute',
        top: '5px',
        right: 'calc(50% - 40px)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1rem',
      }}
      onClick={() => setIsOpen(false)}
    ></i>
  </div>

  <div className="navbar-item">
    <Button variant="outline-white" onClick={() => {
      setIsOpen(false);
      navigate('/createvideo');
    }}>
      <i className="bi bi-upload me-2"></i>Créer une vidéo
    </Button>
  </div>

  <div className="navbar-item" onClick={() => {
    localStorage.removeItem('currentUser');
    setIsOpen(false);
    navigate('/login');
  }}>
    <i className="bi bi-box-arrow-right me-2"></i>Se déconnecter
  </div>
</div>


      <div className={`navbar-slide ${isOpen ? 'open' : ''}`}>
  <div className="navbar-item close-btn" >
    <i className="bi bi-x-circle"></i>
  </div>

  <div className="navbar-item profile-avatar">
    <div className="circle-avatar-large">{getInitial()}</div>
  </div>

  <div className="navbar-item">
    <Button variant="outline-white" onClick={() => {
      setIsOpen(false);
      navigate('/createvideo');
    }}>
      Créer une vidéo
    </Button>
  </div>


  {/* Déconnexion */}
  <div className="navbar-item" onClick={() => {
    localStorage.removeItem('currentUser');
    closeNavbar(); 
    navigate('/login'); 
    window.location.reload();  
    
  }}>
    <i className="bi bi-box-arrow-right me-2"></i> déconnecter
  </div>
</div>

      
    </>
  );
};

export default SiteNavbar;
