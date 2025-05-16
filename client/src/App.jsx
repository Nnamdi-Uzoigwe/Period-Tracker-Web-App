import { BrowserRouter, Router, Routes, Route, useLocation } from 'react-router-dom'
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
import MyLogPage from './pages/MyLogPage'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/Navbar'
import './App.css'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify"
function App() {
  const location = useLocation()

  const noFooterRoutes = ['/signin', '/register', '/dashboard'];

  return (
    <div>
            {location.pathname !== '/dashboard' 
              && location.pathname !== '/signin' 
              && location.pathname !== '/register' &&
              
              <Navbar />
            }


      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/period-log" element={<PeriodLogging />} />
          <Route path="/logs" element={<MyLogPage />} />
          <Route path="/log-history" element={<LogHistory />} />
          <Route path="/log/:id" element={<LogDetails />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  )
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  );
}


export default AppWrapper
