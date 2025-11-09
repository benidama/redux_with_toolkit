import React from 'react';
import { Post } from '../app/api/uploadApi';
import './StorytellingPost.css';

interface StorytellingPostProps {
  posts: Post[];
}

const StorytellingPost: React.FC<StorytellingPostProps> = ({ posts }) => {
  return (
    <div className="storytelling-container">
      {posts.map((post) => (
        <div key={post.id || post._id} className="story-card">
          <h3 className="story-title">{post.title}</h3>
          <div className="story-content">{post.content}</div>
          {post.images.length > 0 && (
            <div className="story-images">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.filename}
                  className="story-image"
                />
              ))}
            </div>
          )}
          <div className="story-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StorytellingPost;