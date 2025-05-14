

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateVideo = () => {
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    category: '',
    thumbnail: '',
    url: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!videoDetails.title || !videoDetails.category || !videoDetails.url || !videoDetails.description) {
      setMessage('Tous les champs doivent être remplis.');
      return;
    }

    setIsSaving(true);
    setMessage('');

    // Récupérer les vidéos existantes dans le localStorage
    const existingVideos = JSON.parse(localStorage.getItem('videos')) || [];

    // Créer un nouvel objet vidéo
    const newVideo = {
      id: existingVideos.length + 1, // simple ID basé sur la longueur actuelle de la liste
      ...videoDetails,
    };

    // Ajouter la vidéo au tableau
    existingVideos.push(newVideo);

    // Sauvegarder les vidéos mises à jour dans le localStorage
    localStorage.setItem('videos', JSON.stringify(existingVideos));

    setMessage('Vidéo ajoutée avec succès !');
    setIsSaving(false);
    navigate('/'); // Rediriger vers la page d'accueil après la sauvegarde
  };

  return (
    <Container className="mt-5">
      <style>
        {`
          .video-form {
            background: rgba(255, 255, 255, 0.1); 
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          }

          .video-form .form-label {
            font-weight: bold;
          }

          .video-form .form-control {
            border-radius: 8px;
          }

          .video-form button {
            background-color:rgb(2, 21, 46);
            border: none;
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-size: 16px;
          }

          .video-form button:hover {
            background-color: #e67e22;
          }

          h2 {
            color: #333;
          }
        `}
      </style>

      <h2 className="text-center mb-4">Ajouter une nouvelle vidéo</h2>

      {message && <Alert variant={message.includes('Erreur') ? 'danger' : 'success'}>{message}</Alert>}

      <Form onSubmit={handleSubmit} className="video-form">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formTitle">
              <Form.Label>Titre de la vidéo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le titre de la vidéo"
                value={videoDetails.title}
                onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez la catégorie"
                value={videoDetails.category}
                onChange={(e) => setVideoDetails({ ...videoDetails, category: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formThumbnail">
              <Form.Label>l'image miniature de votre video</Form.Label>
              <Form.Control
                type="file"
                value={videoDetails.thumbnail}
                onChange={(e) => setVideoDetails({ ...videoDetails, thumbnail: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formUrl">
              <Form.Label>URL de la vidéo</Form.Label>
              <Form.Control
                type="url"
                placeholder="Entrez l'URL de la vidéo YouTube"
                value={videoDetails.url}
                onChange={(e) => setVideoDetails({ ...videoDetails, url: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrez une description de la vidéo"
                value={videoDetails.description}
                onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={isSaving} className="w-100">
          {isSaving ? 'Enregistrement en cours...' : 'Ajouter la vidéo'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateVideo;
