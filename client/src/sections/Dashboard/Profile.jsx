import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Profile() {
    const defaultName = sessionStorage.getItem('newUserName') || 'Not Set';
    const [profile, setProfile] = useState({
    name: '',
    dob: '',
    cycleLength: 28,
    periodLength: 5,
    notifyBeforePeriod: true,
    notifyOnFertile: true
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load saved profile data on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('periodTrackerProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('periodTrackerProfile', JSON.stringify(profile));
    toast.success('Profile saved successfully!');
    setIsEditing(false);
  };


  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">My Profile</h2>
      
      {!isEditing ? (
        // Display mode
        <div className="space-y-4">
          <div>
            <h3 className="text-gray-500 text-sm">Name</h3>
            <p className="text-lg">{profile.name || defaultName}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Date of Birth</h3>
            <p className="text-lg">
              {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'Not set'}
            </p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Average Cycle Length</h3>
            <p className="text-lg">{profile.cycleLength} days</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Average Period Length</h3>
            <p className="text-lg">{profile.periodLength} days</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition mt-6"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit mode
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Average Cycle Length (days)
            </label>
            <input
              type="number"
              name="cycleLength"
              value={profile.cycleLength}
              onChange={handleChange}
              min="21"
              max="45"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Average Period Length (days)
            </label>
            <input
              type="number"
              name="periodLength"
              value={profile.periodLength}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notifyBeforePeriod"
                checked={profile.notifyBeforePeriod}
                onChange={handleChange}
                className="rounded text-purple-600"
              />
              <span>Notify me before my period starts</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notifyOnFertile"
                checked={profile.notifyOnFertile}
                onChange={handleChange}
                className="rounded text-purple-600"
              />
              <span>Notify me during fertile window</span>
            </label>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="submit"
              className="cursor-pointer flex-1 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
    </DashboardLayout>
  );
}
