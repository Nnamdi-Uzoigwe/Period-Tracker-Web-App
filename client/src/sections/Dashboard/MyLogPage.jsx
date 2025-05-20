// // import React, { useState, useEffect } from 'react';
// // import { format } from 'date-fns';
// // import { Box, Typography, Card, CardContent, Grid, CircularProgress, Chip } from '@mui/material';
// // import { styled } from '@mui/system';
// // import DashboardLayout from '../components/DashboardLayout'; // Adjust the import path as needed

// // // Styled components (keep the same as before)
// // const StyledCard = styled(Card)(({ theme }) => ({
// //   marginBottom: theme.spacing(2),
// //   borderRadius: '12px',
// //   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
// //   transition: 'transform 0.2s',
// //   '&:hover': {
// //     transform: 'translateY(-2px)'
// //   }
// // }));

// // const CycleStatusChip = styled(Chip)(({ status, theme }) => ({
// //   backgroundColor: status === 'current' ? theme.palette.success.light : 
// //                    status === 'upcoming' ? theme.palette.warning.light : 
// //                    theme.palette.grey[300],
// //   color: status === 'current' ? theme.palette.success.dark : 
// //          status === 'upcoming' ? theme.palette.warning.dark : 
// //          theme.palette.grey[700],
// //   fontWeight: 600
// // }));

// // const MyLogPage = () => {
// //   // ... (keep all the existing state and effect hooks)

// //   if (loading) {
// //     return (
// //       <DashboardLayout>
// //         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
// //           <CircularProgress />
// //         </Box>
// //       </DashboardLayout>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <DashboardLayout>
// //         <Box p={3} textAlign="center">
// //           <Typography color="error">Error: {error}</Typography>
// //         </Box>
// //       </DashboardLayout>
// //     );
// //   }

// //   if (logs.length === 0) {
// //     return (
// //       <DashboardLayout>
// //         <Box p={3} textAlign="center">
// //           <Typography variant="h6">No cycle logs found</Typography>
// //           <Typography variant="body1">Start tracking your cycles to see data here</Typography>
// //         </Box>
// //       </DashboardLayout>
// //     );
// //   }

// //   return (
// //     <DashboardLayout>
// //       <Box p={3}>
// //         <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
// //           My Cycle History
// //         </Typography>
        
// //         {/* ... (keep all the existing Grid and Card content) ... */}
// //       </Box>
// //     </DashboardLayout>
// //   );
// // };

// // export default MyLogPage;

// // import React, { useState, useEffect } from 'react';
// // import { format } from 'date-fns';
// // import DashboardLayout from '../../layouts/DashboardLayout'; // Adjust the import path

// // const MyLogPage = () => {
// //   const [logs, setLogs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Simulate API call
// //     setTimeout(() => {
// //       try {
// //         // Replace with real fetch logic
// //         const fakeData = [
// //           { id: 1, startDate: '2025-05-01', endDate: '2025-05-05', status: 'current' },
// //           { id: 2, startDate: '2025-04-01', endDate: '2025-04-05', status: 'past' },
// //           { id: 3, startDate: '2025-06-01', endDate: '2025-06-05', status: 'upcoming' }
// //         ];
// //         setLogs(fakeData);
// //         setLoading(false);
// //       } catch (err) {
// //         setError('Failed to load logs');
// //         setLoading(false);
// //       }
// //     }, 1000);
// //   }, []);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'current':
// //         return 'bg-green-100 text-green-800';
// //       case 'upcoming':
// //         return 'bg-yellow-100 text-yellow-800';
// //       default:
// //         return 'bg-gray-200 text-gray-700';
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <DashboardLayout>
// //         <div className="flex justify-center items-center min-h-[200px]">
// //           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
// //         </div>
// //       </DashboardLayout>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <DashboardLayout>
// //         <div className="p-6 text-center text-red-500">
// //           <p>Error: {error}</p>
// //         </div>
// //       </DashboardLayout>
// //     );
// //   }

// //   if (logs.length === 0) {
// //     return (
// //       <DashboardLayout>
// //         <div className="p-6 text-center">
// //           <h2 className="text-xl font-semibold">No cycle logs found</h2>
// //           <p className="text-gray-600">Start tracking your cycles to see data here</p>
// //         </div>
// //       </DashboardLayout>
// //     );
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div className="p-6">
// //         <h1 className="text-2xl font-bold mb-6">My Cycle History</h1>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {logs.map((log) => (
// //             <div
// //               key={log.id}
// //               className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-transform duration-200 transform hover:-translate-y-1"
// //             >
// //               <div className="flex justify-between items-center mb-2">
// //                 <h2 className="text-lg font-semibold">Cycle {log.id}</h2>
// //                 <span className={`text-sm px-2 py-1 rounded-full font-semibold ${getStatusColor(log.status)}`}>
// //                   {log.status}
// //                 </span>
// //               </div>
// //               <p className="text-gray-700">
// //                 <span className="font-medium">Start:</span> {format(new Date(log.startDate), 'PPP')}
// //               </p>
// //               <p className="text-gray-700">
// //                 <span className="font-medium">End:</span> {format(new Date(log.endDate), 'PPP')}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // };

// // export default MyLogPage;


// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import DashboardLayout from '../../layouts/DashboardLayout';
// import { useNavigate } from 'react-router-dom';

// const MyLogPage = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCycleLogs = async () => {
//       try {
//         const response = await fetch('http://localhost:7000/api/cycles', {
//           headers: {
//             'Authorization': `Bearer ${sessionStorage.getItem('token')}`
//           }
//         });
        
//         if (!response.ok) throw new Error('Failed to fetch cycle logs');
//         const data = await response.json();
//         console.log(data)
//         setLogs(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCycleLogs();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'current': return 'bg-green-100 text-green-800';
//       case 'upcoming': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getCycleStatus = (startDate, cycleLength) => {
//     const today = new Date();
//     const start = new Date(startDate);
//     const end = new Date(start);
//     end.setDate(start.getDate() + cycleLength);
    
//     if (today >= start && today <= end) return 'current';
//     if (today < start) return 'upcoming';
//     return 'completed';
//   };

//   const handleViewDetails = (logId) => {
//     navigate(`/logs/${logId}`);
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center min-h-[200px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="p-4 text-center">
//           <p className="text-red-500">Error: {error}</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (logs.length === 0) {
//     return (
//       <DashboardLayout>
//         <div className="p-4 text-center">
//           <h2 className="text-xl font-semibold">No cycle logs found</h2>
//           <p className="text-gray-600">Start tracking your cycles to see data here</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-8">My Cycle History</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {logs.map((log) => {
//             const status = getCycleStatus(log.startDate, log.cycleLength);
//             const formattedStart = format(new Date(log.startDate), 'MMM dd, yyyy');
//             const formattedEnd = format(
//               new Date(new Date(log.startDate).setDate(new Date(log.startDate).getDate() + log.cycleLength)), 
//               'MMM dd, yyyy'
//             );
            
//             return (
//               <div 
//                 key={log._id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1"
//               >
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">
//                       {formattedStart} - {formattedEnd}
//                     </h3>
//                     <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
//                       {status}
//                     </span>
//                   </div>
                  
//                   <div className="mb-4">
//                     <p className="text-gray-600">
//                       <span className="font-medium">Cycle Length:</span> {log.cycleLength} days
//                     </p>
//                     {log.notes && (
//                       <p className="text-gray-600 mt-2">
//                         <span className="font-medium">Notes:</span> {log.notes}
//                       </p>
//                     )}
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm text-gray-500">
//                       Logged: {format(new Date(log.createdAt), 'MMM dd, yyyy')}
//                     </p>
//                     <button
//                       onClick={() => handleViewDetails(log._id)}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default MyLogPage;

// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import DashboardLayout from '../../layouts/DashboardLayout';
// import { useNavigate } from 'react-router-dom';

// const MyLogPage = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCycleLogs = async () => {
//       try {
//         const token = sessionStorage.getItem('token');
//         if (!token) {
//           throw new Error('No authentication token found');
//         }

//         const response = await fetch('http://localhost:7000/api/cycles', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           credentials: 'include' // Needed if using cookies
//         });

//         // First check if response is OK
//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(errorData || 'Failed to fetch cycle logs');
//         }

//         // Then try to parse as JSON
//         const data = await response.json();
//         setLogs(data);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCycleLogs();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'current': return 'bg-green-100 text-green-800';
//       case 'upcoming': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getCycleStatus = (startDate, cycleLength) => {
//     const today = new Date();
//     const start = new Date(startDate);
//     const end = new Date(start);
//     end.setDate(start.getDate() + cycleLength);
    
//     if (today >= start && today <= end) return 'current';
//     if (today < start) return 'upcoming';
//     return 'completed';
//   };

//   const handleViewDetails = (logId) => {
//     navigate(`/logs/${logId}`);
//   };

//   // ... rest of your component remains the same ...
//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center min-h-[200px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="p-4 text-center">
//           <p className="text-red-500">Error: {error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (logs.length === 0) {
//     return (
//       <DashboardLayout>
//         <div className="p-4 text-center">
//           <h2 className="text-xl font-semibold">No cycle logs found</h2>
//           <p className="text-gray-600">Start tracking your cycles to see data here</p>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="p-6 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">My Cycle History</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {logs.map((log) => {
//             const startDate = new Date(log.startDate);
//             const endDate = new Date(startDate);
//             endDate.setDate(startDate.getDate() + log.cycleLength);
//             const status = getCycleStatus(log.startDate, log.cycleLength);
            
//             return (
//               <div 
//                 key={log._id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
//               >
//                 <div className="p-6 h-full flex flex-col">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">
//                       {format(startDate, 'MMM dd, yyyy')} → {format(endDate, 'MMM dd, yyyy')}
//                     </h3>
//                     <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
//                       {status}
//                     </span>
//                   </div>
                  
//                   <div className="mb-4 flex-1">
//                     <p className="text-gray-600">
//                       <span className="font-medium">Cycle Length:</span> {log.cycleLength} days
//                     </p>
//                     {log.notes && (
//                       <p className="text-gray-600 mt-2 line-clamp-2">
//                         <span className="font-medium">Notes:</span> {log.notes}
//                       </p>
//                     )}
//                   </div>
                  
//                   <div className="flex justify-between items-center mt-auto">
//                     <p className="text-sm text-gray-500">
//                       Logged: {format(new Date(log.createdAt), 'MMM dd, yyyy')}
//                     </p>
//                     <button
//                       onClick={() => handleViewDetails(log._id)}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
//                     >
//                       View Details
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default MyLogPage;


import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const MyLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCycleLogs = async () => {
      try {
        console.log(sessionStorage.getItem('token'))
        const response = await fetch('https://period-tracker-web-app.onrender.com/api/cycles', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch cycle logs');
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCycleLogs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCycleStatus = (startDate, cycleLength) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + cycleLength);
    
    if (today >= start && today <= end) return 'current';
    if (today < start) return 'upcoming';
    return 'completed';
  };

  const handleViewDetails = (logId) => {
    navigate(`/log/${logId}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (logs.length === 0) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold">No cycle logs found</h2>
          <p className="text-gray-600">Start tracking your cycles to see data here</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="px-3 py-4">
        <h1 className="text-3xl font-bold mb-8">My Log History</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log) => {
            const status = getCycleStatus(log.startDate, log.cycleLength);
            const formattedStart = format(new Date(log.startDate), 'MMM dd, yyyy');
            const formattedEnd = format(
              new Date(new Date(log.startDate).setDate(new Date(log.startDate).getDate() + log.cycleLength)), 
              'MMM dd, yyyy'
            );
            
            return (
              <div 
                key={log._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {formattedStart} - {formattedEnd}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Cycle Length:</span> {log.cycleLength} days
                    </p>
                    {log.notes && (
                      <p className="text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span> {log.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Logged: {format(new Date(log.createdAt), 'MMM dd, yyyy')}
                    </p>
                    <button
                      onClick={() => handleViewDetails(log._id)}
                      className="cursor-pointer px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-950 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyLogPage;