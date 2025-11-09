import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { RootState } from '../app/store/todoStore';
import { logout } from '../app/feature/authSlice';
import CreatePost from '../components/CreatePost';
import PostsList from '../components/PostsList';
import UploadImages from '../components/UploadImages';


const LeaderDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showUploadProfile, setShowUploadProfile] = useState(false);
  const [showUploadPost, setShowUploadPost] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  const handleProfileImageUpdate = (imageUrl: string) => {
    setProfileImage(imageUrl);
    localStorage.setItem('profileImage', imageUrl);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Leader Dashboard</h1>
            <div className="flex items-center gap-3">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Leader
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setShowUploadProfile(true)}
              className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer overflow-hidden"
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-gray-500 text-xs">Profile</span>
              )}
            </button>
            <div>
              <p className="text-gray-600">Welcome, {user?.name}!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Leader Features:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Manage team members
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Assign tasks to workers
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                View performance reports
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Monitor operations
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Access analytics
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions:</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowCreatePost(true)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Post
              </button>
              <button
                onClick={() => setShowUploadProfile(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Profile Image
              </button>
              <button
                onClick={() => setShowUploadPost(true)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Upload Post Image
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <PostsList />
        </div>
      </div>

      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CreatePost onClose={() => setShowCreatePost(false)} />
        </div>
      )}

      {showUploadProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UploadImages 
            type="profile" 
            onClose={() => setShowUploadProfile(false)} 
            onImageUploaded={handleProfileImageUpdate}
          />
        </div>
      )}

      {showUploadPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UploadImages type="post" onClose={() => setShowUploadPost(false)} />
        </div>
      )}
    </div>
  );
};

export default LeaderDashboard;