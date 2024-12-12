import React from 'react';

const SubmitButton = ({ children = 'Sign up' }) => {
  return (
    <div className="mt-8">
      <button 
        type="submit" 
        className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
      >
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;