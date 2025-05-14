import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    setVideos(storedVideos);
  }, []);

  const handleViewVideo = (id) => {
    
    navigate(`/video/${id}`);
  };

  return (
    <Container className="mt-5">
      <h2>Liste des vidéos</h2>
      <div className="d-flex flex-wrap">
        {videos.map((video) => (
          <Card key={video.id} style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={video.thumbnail} />
            <Card.Body>
              <Card.Title>{video.title}</Card.Title>
              <Card.Text>{video.description}</Card.Text>
              <Button variant="primary" onClick={() => handleViewVideo(video.id)}>
                Voir la vidéo
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default VideoList;
