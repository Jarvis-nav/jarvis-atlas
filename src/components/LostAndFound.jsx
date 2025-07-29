import React, { useState } from 'react'
import lostItemsData from '../data/lostItems.json'
import './LostAndFound.css'

// Import local images
import headphonesImg from '../assets/images/headphones.png'
import bottleImg from '../assets/images/blue_bottle.png'
import hoodieImg from '../assets/images/grey_hoodi.png'
import defaultImg from '../assets/images/lost-item.png'

// Map image names from JSON to imported image files
const imageMap = {
  'headphones.png': headphonesImg,
  'blue_bottle.png': bottleImg,
  'grey_hoodie.png': hoodieImg,
}

const LostAndFound = () => {
  const [form, setForm] = useState({ name: '', category: '', location: '', date: '', description: '' })
  const [items, setItems] = useState(lostItemsData)
  const [filters, setFilters] = useState({ category: '', location: '', date: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Lost item reported! (Simulated)')
    setForm({ name: '', category: '', location: '', date: '', description: '' })
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const filteredItems = items.filter(item => {
    return (
      (!filters.category || item.category === filters.category) &&
      (!filters.location || item.location === filters.location) &&
      (!filters.date || item.date === filters.date)
    )
  })

  return (
    <div className="container">
      <h2>Lost & Found</h2>

      <form className="lost-form card" onSubmit={handleSubmit}>
        <h3>Report Lost Item</h3>
        <input
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Last Seen Zone"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="filters">
        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Personal">Personal</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select name="location" onChange={handleFilterChange}>
          <option value="">All Zones</option>
          <option value="Zone A">Zone A</option>
          <option value="Zone B">Zone B</option>
          <option value="Zone C">Zone C</option>
        </select>

        <input type="date" name="date" onChange={handleFilterChange} />
      </div>

      <div className="found-list">
        <h3>Held in reception</h3>
        {filteredItems.map((item, i) => {
          const imgSrc = imageMap[item.image] || defaultImg
          return (
            <div className="found-card card" key={i}>
              <img
                src={imgSrc}
                alt={item.name}
                onError={(e) => (e.target.src = defaultImg)}
              />
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p><strong>Zone:</strong> {item.location}</p>
                <p><strong>Found:</strong> {item.date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LostAndFound
