import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UsernameInput } from './UsernameInput';
import { PasswordInput } from './PasswordInput';
import { LoginHeader } from './LoginHeader';
import { RegisterPrompt } from './RegisterPrompt';

export const LoginForm = ({ formData, onInputChange, onSubmit,error
 }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <LoginHeader />

        {error && (
        <div className="mt-3 text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded flex items-center">
          <svg
            className="w-4 h-4 mr-2 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
        
        <UsernameInput 
          value={formData.username}
          onChange={onInputChange}
        />
        
        <PasswordInput 
          value={formData.password}
          onChange={onInputChange}
          showPassword={showPassword}
          onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
        />
        
        <div className="!mt-8">
          <button 
            type="submit" 
            className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Log in
          </button>
        </div>

        <RegisterPrompt />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  formData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};