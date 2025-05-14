import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import VideoCard from '../components/VideoCard';
import videos from './VideoData'; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get('q')?.toLowerCase() || '';
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = videos.filter(video => {
        
        const titleMatch = video.title.toLowerCase().includes(query);
        const categoryMatch = video.category.toLowerCase().includes(query);
        const descriptionMatch = video.description.toLowerCase().includes(query);

        return titleMatch || categoryMatch || descriptionMatch;
      });
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos([]);
    }
  }, [query]);

  return (
    <Container className="mt-4">
      <h4>Résultats pour "{query}"</h4>
      <Row>
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <Col key={video.id} md={4}>
              <VideoCard video={video} />
            </Col>
          ))
        ) : (
          <p>Aucune vidéo trouvée pour cette recherche.</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchPage;

