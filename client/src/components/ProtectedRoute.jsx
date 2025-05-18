import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 text-center">
          <div className="w-12 h-12 border-4 border-green-100 rounded-full animate-spin border-t-purple-500 mx-auto mb-4"></div>
          <h1 className='text-purple-500 text-3xl font-semibold'>Oops!</h1>
          <p className="text-gray-500 text-md font-medium">
            You are not logged in. Redirecting to login page...
          </p>
          <div className="mt-6 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full animate-[progress_3s_linear_forwards]" 
              style={{ animation: 'progress 3s linear forwards' }}
            ></div>
          </div>
        </div>
        
        {shouldRedirect && <Navigate to="/signin" replace />}
      </div>
    );
  }

  return <Outlet />;
}