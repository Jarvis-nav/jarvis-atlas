import React, { useEffect, useState } from 'react'
import floorMap from '../assets/floor1.png'
import './QRScanner.css'

const QRScanner = ({ onDetected }) => {
  const [zone, setZone] = useState('')

  useEffect(() => {
    
    setTimeout(() => {
      const simulatedZone = 'Zone A'
      setZone(simulatedZone)
      onDetected(simulatedZone)
    }, 1000)
  }, [])

  return (
    <div className="qr-container">
      <h2>Detecting your location...</h2>
      {zone && (
        <>
          <p><strong>Current Zone:</strong> {zone}</p>
          <div className="map-container">
            <img src={floorMap} alt="Floor Map" className="floor-map" />
            <div className="highlight-zone">📍</div>
          </div>
        </>
      )}
    </div>
  )
}

export default QRScanner
