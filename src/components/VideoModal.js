import React from 'react';
import { Modal } from 'react-bootstrap';

const VideoModal = ({ show, onHide, video }) => {
  if (!video) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{video.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ratio ratio-16x9">
          <iframe
            src={video.url}
            title={video.title}
            allowFullScreen
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <p className="mt-3">{video.description}</p>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
