import React, { useState } from 'react';
import { useGetAllPostsQuery, useDeletePostMutation, type Post } from '../app/api/uploadApi';
import ImageDisplay from './ImageDisplay';
import EditPost from './EditPost';

const PostsList: React.FC = () => {
  const { data: postsData, isLoading, error } = useGetAllPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleDelete = async (post: any) => {
    const postId = post.id || post._id;
    
    if (!postId) {
      alert('Post ID not found. Cannot delete post.');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId).unwrap();
      } catch (error: any) {
        console.error('Delete failed:', error);
        if (error.status === 403) {
          alert('You do not have permission to delete this post.');
        } else {
          alert('Failed to delete post. Please try again.');
        }
      }
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading posts...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading posts</div>;

  const posts = postsData?.posts || [];
  


  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">All Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No posts available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {posts.map((post, postIndex) => {
          const postId = post.id || post._id;
          return (
          <div key={postId || postIndex} className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-semibold text-gray-800">{post.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPost(post)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{post.content}</p>
            {post.images && post.images.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Images ({post.images.length}):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {post.images.map((image, index) => {
                    const imageUrl = typeof image === 'string' ? image : image.url;
                    const imageName = typeof image === 'string' ? `Image ${index + 1}` : (image.filename || `Image ${index + 1}`);
                    return (
                      <ImageDisplay
                        key={`${postId || postIndex}-image-${index}`}
                        src={imageUrl}
                        alt={imageName}
                        className="w-52 h-32 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all"
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
        })}
        </div>
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
      
      {editingPost && (
        <EditPost
          post={editingPost}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  );
};

export default PostsList;