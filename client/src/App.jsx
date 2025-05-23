import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './sections/Dashboard/Profile'
import PeriodLogging from './sections/Dashboard/PeriodLogging'
import LogDetails from './sections/Dashboard/LogDetails'
import LogHistory from './sections/Dashboard/LogHistory'
import MyLogPage from './sections/Dashboard/MyLogPage'
import Prediction from './sections/Dashboard/Prediction'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import './App.css'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify"
import PredictionDetail from './sections/Dashboard/PredictionDetail';

function App() {
  const location = useLocation();

  const noFooterRoutes = [
    '/signin',
    '/register',
    '/dashboard',
    '/period-log',
    '/logs',
    '/prediction/',
    '/prediction',
    '/log-history',
    '/profile',
    '/log/'
  ];

  const shouldShowFooter = !noFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  const noNavbarRoutes = [
    '/signin',
    '/register',
    '/dashboard',
    '/period-log',
    '/logs',
    '/prediction/',
    '/prediction',
    '/log-history',
    '/profile',
    '/log/'
  ];

  const shouldShowNavbar = !noNavbarRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      {shouldShowNavbar && <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/period-log" element={<PeriodLogging />} />
            <Route path="/logs" element={<MyLogPage />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/prediction/:id" element={<PredictionDetail />} />
            <Route path="/log-history" element={<LogHistory />} />
            <Route path="/log/:id" element={<LogDetails />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>

      {shouldShowFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <App /> */}
      <div className='flex items-center justify-center h-screen'>Have you paid up yet?😿</div>
    </BrowserRouter>
  );
}

export default AppWrapper;