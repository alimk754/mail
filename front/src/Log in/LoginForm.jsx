import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UsernameInput } from './UsernameInput';
import { PasswordInput } from './PasswordInput';
import { LoginHeader } from './LoginHeader';
import { RegisterPrompt } from './RegisterPrompt';

export const LoginForm = ({ formData, onInputChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <LoginHeader />
        
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
    rememberMe: PropTypes.bool.isRequired
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};