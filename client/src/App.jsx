import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import PeriodLogging from './pages/PeriodLogging'
import LogDetails from './pages/LogDetails'
import LogHistory from './pages/LogHistory'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/Navbar'
import './App.css'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/period-log" element={<PeriodLogging />} />
        <Route path="/log-history" element={<LogHistory />} />
        <Route path="/log/:id" element={<LogDetails />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
      <Footer />
    </Router>
  )
}

export default App
