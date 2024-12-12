import React from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = ({ 
  value, 
  onChange, 
  showPassword, 
  onTogglePasswordVisibility 
}) => (
  <div>
    <label className="text-gray-800 text-sm mb-2 block">Password</label>
    <div className="relative flex items-center">
      <input 
        minLength={8}
        maxLength={16}
        name="password"
        type={showPassword ? "text" : "password"} 
        required 
        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
        placeholder="Enter password"
        value={value}
        onChange={onChange}
      />
      {showPassword ? (
        <Eye 
          className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-400"
          onClick={onTogglePasswordVisibility}
        />
      ) : (
        <EyeOff 
          className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-400"
          onClick={onTogglePasswordVisibility}
        />
      )}
    </div>
  </div>
);

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  onTogglePasswordVisibility: PropTypes.func.isRequired
};