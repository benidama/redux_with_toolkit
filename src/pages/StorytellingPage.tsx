import React from 'react';
import { useGetAllPostsQuery } from '../app/api/uploadApi';
import StorytellingPost from '../components/StorytellingPost';

const StorytellingPage: React.FC = () => {
  const { data, isLoading, error } = useGetAllPostsQuery();

  if (isLoading) return <div>Loading stories...</div>;
  if (error) return <div>Error loading stories</div>;

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Stories</h1>
      <StorytellingPost posts={data?.posts || []} />
    </div>
  );
};

export default StorytellingPage;