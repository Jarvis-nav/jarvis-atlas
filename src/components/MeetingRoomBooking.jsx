import React, { useState } from 'react'
import meetingData from '../data/rooms.json'
import './MeetingRoomBooking.css'

const MeetingRoomBooking = () => {
  const [selectedDate, setSelectedDate] = useState('2025-07-28')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    roomId: '',
    floorId: '',
    time: '',
    purpose: ''
  })

  const isSameDay = (date1, date2) =>
    new Date(date1).toDateString() === new Date(date2).toDateString()

  const handleDateChange = (e) => setSelectedDate(e.target.value)

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!formData.roomId || !formData.time || !formData.purpose) {
      alert('Please fill all fields')
      return
    }
    alert(`Meeting booked for room ${formData.roomId} at ${formData.time}`)
    setShowForm(false)
    setFormData({ roomId: '', floorId: '', time: '', purpose: '' })
  }

  return (
    <div className="meeting-container">
      <h2>📅 Meeting Room Booking</h2>

      <div className="calendar-wrapper">
        <label>Select Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>

      {meetingData.floors.map((floor) => (
        <div key={floor.floorId} className="floor-section">
          <h3>{floor.floorName}</h3>
          <div className="room-list">
            {floor.meetingRooms.map((room) => {
              const bookingsToday = room.bookings.filter(b =>
                isSameDay(b.startTime, selectedDate)
              )

              return (
                <div key={room.roomId} className={`room-card ${room.availabilityStatus}`}>
                  <h4>{room.roomName}</h4>
                  <p className="location">{room.location}</p>
                  <p className="capacity">Capacity: {room.capacity}</p>
                  <div className="amenities">
                    {room.amenities.map((item, i) => (
                      <span key={i} className="tag">{item}</span>
                    ))}
                  </div>

                  <div className="booking-list">
                    {bookingsToday.length === 0 ? (
                      <p className="no-booking">No bookings for selected date</p>
                    ) : (
                      bookingsToday.map((b) => (
                        <div key={b.bookingId} className={`booking-slot ${b.bookingStatus}`}>
                          <strong>{b.purpose}</strong>
                          <p>
                            {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="status">Status: {b.bookingStatus}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Floating Button */}
      <button className="floating-book-btn" onClick={() => setShowForm(true)}>
        + Book Meeting Room
      </button>

      {/* Booking Modal */}
      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <h3>📌 New Booking</h3>

            <select name="roomId" value={formData.roomId} onChange={handleFormChange}>
              <option value="">Select Room</option>
              {meetingData.floors.flatMap(f => 
                f.meetingRooms.map(r => (
                  <option key={r.roomId} value={r.roomId}>{r.roomName}</option>
                ))
              )}
            </select>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleFormChange}
            />

            <input
              type="text"
              name="purpose"
              placeholder="Meeting Purpose"
              value={formData.purpose}
              onChange={handleFormChange}
            />

            <button className="submit-booking-btn" onClick={handleSubmit}>
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MeetingRoomBooking
