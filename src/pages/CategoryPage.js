
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import VideoCard from '../components/VideoCard';
import videos from './VideoData';

function CategoryPage() {
  const { categoryName } = useParams();
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    if (categoryName) {
      const filtered = videos.filter(video =>
        video.category.toLowerCase() === categoryName.toLowerCase()
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos([]);
    }
  }, [categoryName]);

  return (
    <Container className="mt-4">
      <h4>Vidéos en catégorie "{categoryName}"</h4>
      <Row>
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <Col key={video.id} md={4}>
              <VideoCard video={video} />
            </Col>
          ))
        ) : (
          <p>Aucune vidéo disponible pour cette catégorie.</p>
        )}
      </Row>
    </Container>
  );
}

export default CategoryPage;
