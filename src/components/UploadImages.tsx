import React, { useState } from 'react';
import { useUploadMultipleImagesMutation } from '../app/api/uploadApi';

interface UploadedImage {
  url: string;
  filename: string;
}

interface UploadImagesProps {
  onClose: () => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadImages, { isLoading }] = useUploadMultipleImagesMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please select images to upload');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const result = await uploadImages(formData).unwrap();
      setUploadedImages(result.images);
      setSelectedFiles(null);
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
        <h3 className="text-xl font-semibold text-gray-800">Upload Images</h3>
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
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        <button
          onClick={handleUpload}
          disabled={isLoading || !selectedFiles}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Uploading...' : 'Upload Images'}
        </button>
      </div>

      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-3">Uploaded Images:</h4>
          <div className="grid grid-cols-3 gap-3">
            {uploadedImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.filename}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImages;