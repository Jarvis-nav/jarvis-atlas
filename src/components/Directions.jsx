import React from 'react';

const Directions = ({ source, destination }) => {
  return (
    <div style={{ background: '#fff8e1', padding: '1rem', borderRadius: '8px' }}>
      <h4>Directions:</h4>
      <ol>
        <li>Start at <strong>{source.name}</strong>.</li>
        <li>Walk straight towards <strong>{destination.name}</strong>.</li>
        <li>Estimated distance: {Math.floor(Math.random() * 40 + 10)} meters.</li>
        <li>Look for blue zone markers.</li>
        <li>You have arrived at your destination.</li>
      </ol>
    </div>
  );
};

export default Directions;
