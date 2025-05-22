// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import DashboardLayout from "../../layouts/DashboardLayout";

// export default function Profile() {
//     const defaultName = sessionStorage.getItem('newUserName') || 'Not Set';
//     const [profile, setProfile] = useState({
//     name: '',
//     dob: '',
//     cycleLength: 28,
//     periodLength: 5,
//     notifyBeforePeriod: true,
//     notifyOnFertile: true
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   // Load saved profile data on component mount
//   useEffect(() => {
//     const savedProfile = localStorage.getItem('periodTrackerProfile');
//     if (savedProfile) {
//       setProfile(JSON.parse(savedProfile));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProfile(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('periodTrackerProfile', JSON.stringify(profile));
//     toast.success('Profile saved successfully!');
//     setIsEditing(false);
//   };

//   return (
//     <DashboardLayout>
//       <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-purple-800 mb-6">My Profile</h2>

//       {!isEditing ? (
//         // Display mode
//         <div className="space-y-4">
//           <div>
//             <h3 className="text-gray-500 text-sm">Name</h3>
//             <p className="text-lg">{profile.name || defaultName}</p>
//           </div>
//           <div>
//             <h3 className="text-gray-500 text-sm">Date of Birth</h3>
//             <p className="text-lg">
//               {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'Not set'}
//             </p>
//           </div>
//           <div>
//             <h3 className="text-gray-500 text-sm">Average Cycle Length</h3>
//             <p className="text-lg">{profile.cycleLength} days</p>
//           </div>
//           <div>
//             <h3 className="text-gray-500 text-sm">Average Period Length</h3>
//             <p className="text-lg">{profile.periodLength} days</p>
//           </div>
//           <button
//             onClick={() => setIsEditing(true)}
//             className="cursor-pointer w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition mt-6"
//           >
//             Edit Profile
//           </button>
//         </div>
//       ) : (
//         // Edit mode
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={profile.name}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               placeholder="Your name"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Date of Birth</label>
//             <input
//               type="date"
//               name="dob"
//               value={profile.dob}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               max={new Date().toISOString().split('T')[0]}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">
//               Average Cycle Length (days)
//             </label>
//             <input
//               type="number"
//               name="cycleLength"
//               value={profile.cycleLength}
//               onChange={handleChange}
//               min="21"
//               max="45"
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">
//               Average Period Length (days)
//             </label>
//             <input
//               type="number"
//               name="periodLength"
//               value={profile.periodLength}
//               onChange={handleChange}
//               min="1"
//               max="10"
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="notifyBeforePeriod"
//                 checked={profile.notifyBeforePeriod}
//                 onChange={handleChange}
//                 className="rounded text-purple-600"
//               />
//               <span>Notify me before my period starts</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="notifyOnFertile"
//                 checked={profile.notifyOnFertile}
//                 onChange={handleChange}
//                 className="rounded text-purple-600"
//               />
//               <span>Notify me during fertile window</span>
//             </label>
//           </div>

//           <div className="flex space-x-3 mt-6">
//             <button
//               type="submit"
//               className="cursor-pointer flex-1 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//     </DashboardLayout>
//   );
// }

// import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import Spinner from "../../components/Spinner";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout"; // adjust the path if needed
import Spinner from "../../components/Spinner"; // your spinner component, or replace with any loader

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    dob: '',
    cycleLength: 28,
    periodLength: 5,
    notifyBeforePeriod: true,
    notifyOnFertile: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(null)

  // Fetch profile data from backend
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://period-tracker-web-app.onrender.com/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok && response.status !== 404) {
        throw new Error('Failed to fetch profile');
      }
      
      if (response.status === 404) {
        setProfileExists(false);
        return;
      }

      const data = await response.json();
      if (data) {
        setProfile({
          name: data.name || '',
          dob: data.dob || '',
          cycleLength: data.cycleLength || 28,
          periodLength: data.periodLength || 5,
          notifyBeforePeriod: data.notifyBeforePeriod !== false,
          notifyOnFertile: data.notifyOnFertile !== false
        });
        setProfileExists(true);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Save/Update profile data
  const saveProfile = async (profileData) => {
    setIsSaving(true)
    try {
      const token = sessionStorage.getItem('token');
      const method = profileExists ? 'PUT' : 'POST';
      const successMessage = profileExists ? 'Profile updated successfully!' : 'Profile created successfully!';

      const response = await fetch('https://period-tracker-web-app.onrender.com/api/profile', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) throw new Error(`Failed to ${method === 'PUT' ? 'update' : 'create'} profile`);
      
      const data = await response.json();
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 2000,
      });
      setProfileExists(true);
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    } finally {
      setIsSaving(false)
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProfile(profile);
      setIsEditing(false);
      await fetchProfile(); // Refresh data
    } catch (error) {
      console.error('Profile save error:', error);
    }
  };
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">My Profile</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        {!isEditing ? (
          // Display mode
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-500 text-sm">Name</h3>
              <p className="text-lg">{profile.name || "Not set"}</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Date of Birth</h3>
              <p className="text-lg">
                {profile.dob
                  ? new Date(profile.dob).toLocaleDateString()
                  : "Not set"}
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
                required
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
                max={new Date().toISOString().split("T")[0]}
                required
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
                required
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
                required
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
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex gap-2 items-center justify-center">
                    Saving <Spinner />
                  </span>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
                disabled={isSaving}
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
