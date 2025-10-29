import React, { useState } from 'react';
import { useGetAllPostsQuery, useDeletePostMutation } from '../app/api/uploadApi';
import ImageDisplay from './ImageDisplay';

const PostsList: React.FC = () => {
  const { data: postsData, isLoading, error } = useGetAllPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId).unwrap();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading posts...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading posts</div>;

  const posts = postsData?.posts || [];
  


  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No posts available</p>
      ) : (
        posts.map((post, postIndex) => {
          return (
          <div key={post.id || postIndex} className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-semibold text-gray-800">{post.title}</h4>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-600 mb-4">{post.content}</p>
            {post.images && post.images.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Images ({post.images.length}):</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {post.images.map((image, index) => {
                    const imageUrl = typeof image === 'string' ? image : image.url;
                    const imageName = typeof image === 'string' ? `Image ${index + 1}` : (image.filename || `Image ${index + 1}`);
                    return (
                      <ImageDisplay
                        key={`${post.id || postIndex}-image-${index}`}
                        src={imageUrl}
                        alt={imageName}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all"
                        onClick={() => setSelectedImage(imageUrl)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <p className="text-sm text-gray-400">
              Created: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
        })
      )}
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PostsList;