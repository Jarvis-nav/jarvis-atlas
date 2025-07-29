import React from 'react'
import parkingData from '../data/parking.json'
import './ParkingAvailability.css'

const ParkingAvailability = () => {
  const { parkingLotName, lastUpdated, floors } = parkingData

  return (
    <div className="parking-container">
      <h2>{parkingLotName}</h2>
      <p className="updated-time">Last updated: {new Date(lastUpdated).toLocaleString()}</p>

      {floors.map((floor) => (
        <div key={floor.floorId} className="floor-card">
          <div className="floor-header">
            <h3>{floor.floorName}</h3>
            <div className="availability-badge">
              {floor.availableSlots} / {floor.totalSlots} slots available
            </div>
            <div className="vehicle-types">
              {floor.vehicleTypesAllowed.map((type) => (
                <span key={type} className={`vehicle-tag ${type}`}>{type.toUpperCase()}</span>
              ))}
            </div>
          </div>

          {floor.zones.length > 0 && (
            <div className="zone-section">
              {floor.zones.map((zone) => (
                <div key={zone.zoneId} className="zone-card">
                  <h4>{zone.zoneName}</h4>
                  <p>{zone.availableSlots} / {zone.totalSlots} available</p>
                  <div className="slots-grid">
                    {zone.slots.map((slot) => (
                      <div
                        key={slot.slotId}
                        className={`slot ${slot.isAvailable ? 'available' : 'occupied'} ${slot.isEVCompatible ? 'ev' : ''} ${slot.isReserved ? 'reserved' : ''}`}
                        title={slot.slotId}
                      >
                        {slot.slotId.split('-').pop()}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ParkingAvailability
