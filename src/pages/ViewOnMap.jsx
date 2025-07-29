import React from 'react'
import { useLocation } from 'react-router-dom'
import mapImage from '../assets/images/floor1.png'
import './ViewOnMap.css'

const ViewOnMap = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const zone = params.get('zone') || 'Zone A'

  // Dummy mapping for zones to marker positions
  const zoneCoordinates = {
    'Zone A': { top: '40%', left: '30%' },
    'Zone B': { top: '25%', left: '60%' },
    'Zone C': { top: '60%', left: '70%' }
  }

  const marker = zoneCoordinates[zone] || zoneCoordinates['Zone A']

  return (
    <div className="container">
      <h2>View on Map</h2>
      <p><strong>Location:</strong> {zone}</p>

      <div className="map-view-wrapper">
        <img src={mapImage} alt="Office Map" className="map-view-img" />
        <div className="zone-marker" style={marker}>📍</div>
      </div>
    </div>
  )
}

export default ViewOnMap
