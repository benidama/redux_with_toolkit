import React, { useState } from 'react';
import UploadImages from './UploadImages';
import CreatePost from './CreatePost';

type ActiveSection = 'none' | 'upload' | 'post';

const ContentManager: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('none');

  const showUploadSection = () => {
    setActiveSection('upload');
  };

  const showPostSection = () => {
    setActiveSection('post');
  };

  const hideSection = () => {
    setActiveSection('none');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Action Buttons */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={showUploadSection}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Upload Images
        </button>
        <button
          onClick={showPostSection}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Create Post
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === 'upload' && (
        <UploadImages onClose={hideSection} />
      )}
      
      {activeSection === 'post' && (
        <CreatePost onClose={hideSection} />
      )}
    </div>
  );
};

export default ContentManager;