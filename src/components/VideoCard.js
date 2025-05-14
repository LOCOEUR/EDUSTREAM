
import React from 'react';
import { Card } from 'react-bootstrap';

function VideoCard({ video }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={video.thumbnail} />
      <Card.Body>
        <div className="d-flex align-items-center mb-2">
          <img
            src={video.authorAvatar}
            alt="Avatar"
            className="rounded-circle"
            width="40"
            height="40"
            style={{ objectFit: 'cover', marginRight: '10px' }}
          />
          <strong>{video.category}</strong>
        </div>
        <Card.Title>{video.title}</Card.Title>
        <Card.Text>
          <strong>Catégorie : </strong>{video.category}
        </Card.Text>
        <Card.Text>{video.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default VideoCard;

