import React, { useState, useEffect } from 'react'
import lostItemsData from '../data/LostItems.json'
import './LostAndFound.css'

// Import local “default” images
import headphonesImg from '../assets/images/Headphones.png'
import bottleImg    from '../assets/images/blue_bottle.png'
import hoodieImg    from '../assets/images/grey_hoodi.png'
import defaultImg   from '../assets/images/lost-item.png'

// Map old JSON filenames → local imports
const imageMap = {
  'headphones.png':   headphonesImg,
  'blue_bottle.png':  bottleImg,
  'grey_hoodie.png':  hoodieImg,
}

const LostAndFound = () => {
  // include imageFile + imagePreview in form state
  const [form, setForm] = useState({
    name: '', category: '', location: '', date: '', description: '',
    imageFile: null,
    imagePreview: ''
  })

  // items comes from localStorage (if any) or the JSON on first load
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({ category: '', location: '', date: '' })

  console.log(items)
  // on mount, hydrate items from localStorage or JSON
 useEffect(() => {
  const stored = localStorage.getItem('lostItems');

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // only use it if there's actually at least one item
      if (Array.isArray(parsed) && parsed.length > 0) {
        setItems(parsed);
        return;   // bail out early
      }
    } catch (err) {
      console.error('Could not parse lostItems from localStorage:', err);
    }
  }

  // fallback to your initial JSON data
  setItems(lostItemsData);
}, []);


  // whenever items change, persist to localStorage
  useEffect(() => {
    localStorage.setItem('lostItems', JSON.stringify(items))
  }, [items])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  // when user picks a file, convert to data URL so we can preview & store it
  const handleImageChange = e => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(f => ({
        ...f,
        imageFile: file,
        imagePreview: reader.result // base64 data URL
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = e => {
    e.preventDefault()
    // build new item
    const newItem = {
      name:        form.name,
      category:    form.category,
      location:    form.location,
      date:        form.date,
      description: form.description,
      // if user uploaded, use data‑URL; else leave blank so we pick defaultImg
      image:       form.imagePreview || ''
    }
    setItems(prev => [...prev, newItem])

    alert('✅ Lost item reported!')
    // reset form
    setForm({
      name: '', category: '', location: '', date: '', description: '',
      imageFile: null, imagePreview: ''
    })
  }

  const handleFilterChange = e => {
    const { name, value } = e.target
    setFilters(f => ({ ...f, [name]: value }))
  }

  // apply filters
  const filteredItems = items.filter(item => (
    (!filters.category || item.category === filters.category) &&
    (!filters.location || item.location === filters.location) &&
    (!filters.date || item.date === filters.date)
  ))

  return (
    <div className="container">
      <h2>Lost &amp; Found</h2>

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

        {/* new file‑upload */}
        <label htmlFor="image-upload">Upload Image (optional):</label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* preview if chosen */}
        {form.imagePreview && (
          <div className="preview-container">
            <img
              src={form.imagePreview}
              alt="preview"
              className="preview-image"
            />
          </div>
        )}

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

        <input
          type="date"
          name="date"
          onChange={handleFilterChange}
        />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <h3>Held in reception</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
        {filteredItems.map((item, i) => {
          // if data URL, use it; otherwise map old JSON filenames to local imports
          const imgSrc = item.image

          return (
            <div className="found-card card" key={i}>
              <img
                src={imgSrc}
                alt={item.name}
                onError={e => { e.target.src = defaultImg }}
              />
              <div className="found-info">
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
    </div>
  )
}

export default LostAndFound
