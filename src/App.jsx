import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Settings from './pages/Settings'
import ViewOnMap from './pages/ViewOnMap'
import MeetingRoomBooking from './components/MeetingRoomBooking'
import LostAndFound from './components/LostAndFound'
import ParkingAvailability from './components/ParkingAvailability'
import VirtualTour from './components/VirtualTour'
import NavigationMap from './components/NavigationMap'
import FAQ from './components/FAQ'
import Announcements from './components/Announcements'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/map" element={<NavigationMap />} />
      <Route path="/meeting-rooms" element={<MeetingRoomBooking />} />
      <Route path="/lost-found" element={<LostAndFound />} />
      <Route path="/parking" element={<ParkingAvailability />} />
      <Route path="/virtual-tour" element={<VirtualTour />} />
      <Route path="/view-on-map" element={<ViewOnMap />} />
      <Route path="/FAQs" element={<FAQ />} />
      <Route path="/Announcements" element={<Announcements />} />
      

    </Routes>
  )
}

export default App
