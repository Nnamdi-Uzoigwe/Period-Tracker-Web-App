import { useState, useEffect } from 'react';
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
        <h1 className="text-3xl font-bold mb-8 text-purple-800">Your Log History</h1>
        
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