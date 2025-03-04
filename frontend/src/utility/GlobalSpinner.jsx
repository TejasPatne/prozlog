import React from 'react';

const GlobalSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalSpinner;