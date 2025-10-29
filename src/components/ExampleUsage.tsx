import React from 'react';
import ContentManager from './ContentManager';

// Example component showing how to use the ContentManager
const ExampleUsage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Content Management System
        </h1>
        <ContentManager />
      </div>
    </div>
  );
};

export default ExampleUsage;