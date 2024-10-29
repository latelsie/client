// src/pages/UserProfile.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UserProfile = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user.username || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || null);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      username,
      bio,
      profilePicture,
    };

    onUpdate(updatedUser);
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set the profile picture to the base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Tell us about yourself..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          {profilePicture && (
            <img
              src={profilePicture}
              alt="Profile Preview"
              className="w-32 h-32 object-cover mb-4 rounded"
            />
          )}

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mr-4"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                <span className="text-gray-600">No Image</span>
              </div>
            )}
            <div>
              <p className="text-lg font-semibold">{username}</p>
              <p className="text-gray-600">{bio}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
