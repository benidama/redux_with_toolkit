import React, { useState } from 'react';
import { useUploadProfileImageMutation, useUploadPostImageMutation } from '../app/api/uploadApi';

interface UploadImagesProps {
  onClose: () => void;
  type: 'profile' | 'post';
}

const UploadImages: React.FC<UploadImagesProps> = ({ onClose, type }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [uploadProfileImage, { isLoading: isProfileLoading }] = useUploadProfileImageMutation();
  const [uploadPostImage, { isLoading: isPostLoading }] = useUploadPostImageMutation();
  
  const isLoading = isProfileLoading || isPostLoading;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    const fieldName = type === 'profile' ? 'profileImage' : 'postImage';
    formData.append(fieldName, selectedFile);

    try {
      const uploadMutation = type === 'profile' ? uploadProfileImage : uploadPostImage;
      const result = await uploadMutation(formData).unwrap();
      setUploadedImageUrl(result.imageData);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Upload {type === 'profile' ? 'Profile' : 'Post'} Image</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-4">
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        <button
          onClick={handleUpload}
          disabled={isLoading || !selectedFile}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      {uploadedImageUrl && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-3">Uploaded Image:</h4>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            className="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-200 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImages;