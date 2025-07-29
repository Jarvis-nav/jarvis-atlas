import React from 'react';
import floorPlan from '../assets/floor1.png';

const MapView = ({ currentZone, destinationZone }) => {
  return (
    <div style={{ position: 'relative', marginBottom: '1rem' }}>
      <img src={floorPlan} alt="Office Floor Plan" style={{ width: '100%', borderRadius: '8px' }} />

      {currentZone && (
        <div
          title="You are here"
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

      {destinationZone && (
        <div
          title="Destination"
          style={{
            position: 'absolute',
            top: destinationZone.coords.top,
            left: destinationZone.coords.left,
            backgroundColor: 'blue',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Simulated path (straight line) */}
      {currentZone && destinationZone && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <line
            x1={`calc(${currentZone.coords.left})`}
            y1={`calc(${currentZone.coords.top})`}
            x2={`calc(${destinationZone.coords.left})`}
            y2={`calc(${destinationZone.coords.top})`}
            stroke="green"
            strokeWidth="4"
            strokeDasharray="6"
          />
        </svg>
      )}
    </div>
  );
};

export default MapView;
