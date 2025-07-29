import React from 'react';
import floorPlan from '../assets/floor1.png'; // Use PNG or SVG

const MapView = ({ currentZone }) => {
  return (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      <img src={floorPlan} alt="Office Floor Plan" style={{ width: '100%', borderRadius: '8px' }} />
      {currentZone && (
        <div
          style={{
            position: 'absolute',
            top: currentZone.coords.top,
            left: currentZone.coords.left,
            backgroundColor: 'red',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 2s infinite',
          }}
        />
      )}
    </div>
  );
};

export default MapView;
