import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-white h-5 w-5"></div>
    </div>
  );
};

export default LoadingSpinner;