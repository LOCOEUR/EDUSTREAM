
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les vidéos depuis localStorage
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    const video = storedVideos.find(v => v.id === parseInt(id));
    setVideo(video);
  }, [id]);

  if (!video) return <div>Vidéo non trouvée.</div>;

  return (
    <Container className="mt-5">
      <h2>{video.title}</h2>
      <iframe width="560" height="315" src={video.url} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <p><strong>Catégorie :</strong> {video.category}</p>
      <p><strong>Description :</strong> {video.description}</p>
      <Button variant="secondary" onClick={() => navigate('/videos')}>Retour à la liste</Button>
    </Container>
  );
};

export default VideoDetail;
