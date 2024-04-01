import React from 'react';
import './ImageOverlay.css'; // Assume you have a CSS file for styling

interface ImageOverlayProps {
  imageUrl: string;
  text: string;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageUrl, text }) => {
  return (
    <div className="image-overlay" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="overlay-text">{text}</div>
    </div>
  );
};

export default ImageOverlay;
