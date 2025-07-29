

import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import kenvueLogo from '../assets/images/kenvue_logo.svg'

const HomePage = () => {
  const navigate = useNavigate()

  const navItems = [
    { label: 'Navigate', route: '/map', icon: '📍', isPrimary: true },
    { label: 'Book Meeting Rooms', route: '/meeting-rooms', icon: '📅' },
    { label: 'Lost & Found', route: '/lost-found', icon: '🎒' },
    { label: 'Parking', route: '/parking', icon: '🅿️' },
    { label: 'Virtual Tour', route: '/virtual-tour', icon: '🧭' },
    { label: 'Settings', route: '/settings', icon: '⚙️' },
    { label: 'FAQ', route: '/FAQs', icon: '❓' },
    { label: 'Announcements', route: '/Announcements', icon: '📢' },
  ]

  return (
    <div className="home-container">
      <div className="header" style={{justifyContent:'center'}}>
        <div style={{display:'flex',alignItems:'center'}}>

        <img src={kenvueLogo} alt="Kenvue Logo" className="logo" />
        </div>
        <div style={{marginBottom:4}}>
        <h1 style={{fontSize:'1.7rem'}}>ATLAS</h1>

        </div>
      </div>

      <div className="grid">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`grid-item ${item.isPrimary ? 'primary-nav' : ''}`}
            onClick={() => navigate(item.route)}
          >
            <div className="icon">{item.icon}</div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
