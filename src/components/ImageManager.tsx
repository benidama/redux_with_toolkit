import React, { useState } from 'react';
import { useUploadMultipleImagesMutation, useCreatePostMutation, useGetAllPostsQuery } from '../app/api/uploadApi';
import ImageDisplay from './ImageDisplay';
import ImageUploadPreview from './ImageUploadPreview';

const ImageManager: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'upload' | 'post' | 'posts'>('upload');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [postImages, setPostImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<Array<{url: string, filename: string}>>([]);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  
  const [uploadMultipleImages, { isLoading: isUploading }] = useUploadMultipleImagesMutation();
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const { data: postsData, refetch } = useGetAllPostsQuery();

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUploadImages = async () => {
    if (uploadImages.length === 0) {
      showMessage('Please select images to upload', 'error');
      return;
    }

    const formData = new FormData();
    uploadImages.forEach(file => {
      formData.append('images', file);
    });

    try {
      const result = await uploadMultipleImages(formData).unwrap();
      showMessage('Images uploaded successfully!');
      setUploadedImages(result.images);
      setUploadImages([]);
    } catch (error) {
      showMessage('Image upload failed. Please try again.', 'error');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    postImages.forEach(file => {
      formData.append('images', file);
    });

    try {
      await createPost(formData).unwrap();
      showMessage('Post created successfully!');
      setTitle('');
      setContent('');
      setPostImages([]);
      setActiveSection('posts');
      refetch();
    } catch (error) {
      showMessage('Post creation failed. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveSection('upload')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeSection === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upload Images
        </button>
        <button
          onClick={() => setActiveSection('post')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeSection === 'post' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Create Post
        </button>
        <button
          onClick={() => { setActiveSection('posts'); refetch(); }}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeSection === 'posts' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          View Posts
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Upload Section */}
      {activeSection === 'upload' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Upload Images</h3>
          
          <ImageUploadPreview
            onImagesChange={setUploadImages}
            maxImages={10}
            className="mb-4"
          />
          
          <button
            onClick={handleUploadImages}
            disabled={isUploading || uploadImages.length === 0}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? 'Uploading...' : `Upload ${uploadImages.length} Image${uploadImages.length !== 1 ? 's' : ''}`}
          </button>
          
          {uploadedImages.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Recently Uploaded:</h4>
              <div className="grid grid-cols-4 gap-3">
                {uploadedImages.map((image, index) => (
                  <ImageDisplay
                    key={index}
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Section */}
      {activeSection === 'post' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create Post</h3>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post Content"
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
            />
            
            <ImageUploadPreview
              onImagesChange={setPostImages}
              maxImages={5}
            />
            
            <button
              type="submit"
              disabled={isCreatingPost}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isCreatingPost ? 'Creating Post...' : 'Create Post'}
            </button>
          </form>
        </div>
      )}

      {/* Posts Section */}
      {activeSection === 'posts' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">All Posts</h3>
          {postsData?.posts?.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts available</p>
          ) : (
            <div className="space-y-4">
              {postsData?.posts?.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
                  <p className="text-gray-600 mb-3">{post.content}</p>
                  {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {post.images.map((image, index) => (
                        <ImageDisplay
                          key={`${post.id}-image-${index}`}
                          src={image.url}
                          alt={image.filename || `Image ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-400">
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageManager;