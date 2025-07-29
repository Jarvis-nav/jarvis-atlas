import React, { useState } from 'react'
import './VirtualTour.css'

const hotspots = {
  lobby: {
    id: 'lobby',
    name: 'Main Lobby',
    image: 'https://via.placeholder.com/400x200?text=Lobby',
    neighbors: { forward: 'cafeteria', right: 'zoneA', back: null, left: null }
  },
  cafeteria: {
    id: 'cafeteria',
    name: 'Cafeteria',
    image: 'https://via.placeholder.com/400x200?text=Cafeteria',
    neighbors: { back: 'lobby', forward: 'zoneB' }
  },
  zoneA: {
    id: 'zoneA',
    name: 'Zone A - Meeting Rooms',
    image: 'https://via.placeholder.com/400x200?text=Zone+A',
    neighbors: { left: 'lobby', forward: 'zoneC' }
  },
  zoneB: {
    id: 'zoneB',
    name: 'Zone B - Workstations',
    image: 'https://via.placeholder.com/400x200?text=Zone+B',
    neighbors: { back: 'cafeteria' }
  },
  zoneC: {
    id: 'zoneC',
    name: 'Zone C - Collaboration Area',
    image: 'https://via.placeholder.com/400x200?text=Zone+C',
    neighbors: { back: 'zoneA' }
  }
}

const VirtualTour = () => {
  const [current, setCurrent] = useState(hotspots.lobby)

  const handleMove = (dir) => {
    const nextId = current.neighbors[dir]
    if (nextId && hotspots[nextId]) {
      setCurrent(hotspots[nextId])
    } else {
      alert('No path in that direction.')
    }
  }

  return (
    <div className="container">
      <h2>Virtual Office Tour</h2>
      <div className="tour-card card">
        <h3>{current.name}</h3>
        <img src={current.image} alt={current.name} className="tour-img" />
        <div className="arrow-buttons">
          <button onClick={() => handleMove('forward')}>⬆️ Forward</button>
          <button onClick={() => handleMove('left')}>⬅️ Left</button>
          <button onClick={() => handleMove('right')}>➡️ Right</button>
          <button onClick={() => handleMove('back')}>⬇️ Back</button>
        </div>
      </div>
    </div>
  )
}

export default VirtualTour
