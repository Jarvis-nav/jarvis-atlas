import React from 'react'
import './Announcements.css'

const announcements = [
  {
    id: 1,
    title: 'Office Maintenance',
    message: 'Power backup testing will occur between 3–4 PM today. Expect brief flickers.',
    timestamp: '2025-07-28 10:15 AM'
  },
  {
    id: 2,
    title: 'Cafeteria Closed',
    message: 'Cafeteria will be closed on Friday for deep cleaning.',
    timestamp: '2025-07-27 05:30 PM'
  },
  {
    id: 3,
    title: 'New Parking Policy',
    message: 'Please register your vehicle details at the front desk before August 1.',
    timestamp: '2025-07-26 09:00 AM'
  }
]

const Announcements = () => {
  return (
    <div className="announcements-container">
      <h2>📢 Office Announcements</h2>
      <div className="announcements-list">
        {announcements.map((item) => (
          <div key={item.id} className="announcement-card">
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <span className="timestamp">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Announcements
