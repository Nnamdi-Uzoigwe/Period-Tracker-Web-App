// import { BrowserRouter, Router, Routes, Route, useLocation } from 'react-router-dom'
// import LandingPage from './pages/LandingPage'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Signin from './pages/Signin'
// import Register from './pages/Register'
// import Dashboard from './pages/Dashboard'
// import Profile from './sections/Dashboard/Profile'
// import PeriodLogging from './sections/Dashboard/PeriodLogging'
// import LogDetails from './sections/Dashboard/LogDetails'
// import LogHistory from './sections/Dashboard/LogHistory'
// import MyLogPage from './sections/Dashboard/MyLogPage'
// import Prediction from './sections/Dashboard/Prediction'
// import PageNotFound from './pages/PageNotFound'
// import ProtectedRoute from './components/ProtectedRoute'
// import ScrollToTop from './components/ScrollToTop'
// import Navbar from './components/Navbar'
// import './App.css'
// import Footer from './components/Footer'
// import { ToastContainer } from "react-toastify"
// function App() {
//   const location = useLocation()

//    const noFooterRoutes = ['/signin', '/register', '/dashboard', '/period-log', '/logs', '/prediction', '/log-history', '/log', '/profile'];

//    const shouldShowFooter = !noFooterRoutes.some(route =>
//   location.pathname.startsWith(route)
// );

//   return (
//     <div>
//             {location.pathname !== '/dashboard' 
//               && location.pathname !== '/signin' 
//               && location.pathname !== '/register'
//               && location.pathname !== '/period-log'
//               && location.pathname !== '/logs'
//               && location.pathname !== '/prediction'
//               && location.pathname !== '/log-history'
//               && location.pathname !== '/log/:id' 
//               && location.pathname !== '/profile' &&
//               <Navbar />
//             }

//       <div>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/register" element={<Register />} />
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/period-log" element={<PeriodLogging />} />
//             <Route path="/logs" element={<MyLogPage />} />
//             <Route path="/prediction" element={<Prediction />} />
//             <Route path="/log-history" element={<LogHistory />} />
//             <Route path="/log/:id" element={<LogDetails />} />
//           </Route>
//           <Route path="/*" element={<PageNotFound />} />
//         </Routes>
//       </div>
//       {!noFooterRoutes.includes(location.pathname) && <Footer />}
//     </div>
//   )
// }

// function AppWrapper() {
//   return (
//     <BrowserRouter>
//     <ScrollToTop />
//       <App />
//       <ToastContainer />
//     </BrowserRouter>
//   );
// }


// export default AppWrapper
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

  // Define routes where footer should be hidden
  const noFooterRoutes = [
    '/signin',
    '/register',
    '/dashboard',
    '/period-log',
    '/logs',
    '/logs/',
    '/prediction',
    '/log-history',
    '/profile',
    '/log/' // This will match any route starting with '/log/'
  ];

  // Check if current path starts with any noFooterRoutes
  const shouldShowFooter = !noFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  // Define routes where navbar should be hidden
  const noNavbarRoutes = [
    '/signin',
    '/register',
    '/dashboard',
    '/period-log',
    '/logs',
    '/logs/',
    '/prediction',
    '/log-history',
    '/profile',
    '/log/' // This will match any route starting with '/log/'
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
            <Route path="/logs/:id/prediction" element={<PredictionDetail />} />
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
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;