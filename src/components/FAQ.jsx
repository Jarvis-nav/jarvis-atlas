import React, { useState } from 'react'
import './FAQ.css'

const faqList = [
  {
    question: 'How do I book a meeting room?',
    answer: 'Go to the Meeting Rooms section, select a date, and pick an available time slot to book.'
  },
  {
    question: 'Where can I find lost items?',
    answer: 'Check the Lost & Found portal. You can also report your lost item through a form.'
  },
  {
    question: 'How to check parking availability?',
    answer: 'Open the Parking section. You’ll see live dummy status for each parking zone.'
  },
  {
    question: 'How do I start a virtual tour?',
    answer: 'Click the Virtual Tour option and use the arrows to walk through hotspots.'
  }
]

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div className="container">
      <h2>FAQs</h2>
      <div className="faq-list">
        {faqList.map((faq, i) => (
          <div className="faq-item card" key={i}>
            <div className="faq-question" onClick={() => toggle(i)}>
              {faq.question}
              <span>{activeIndex === i ? '−' : '+'}</span>
            </div>
            {activeIndex === i && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
