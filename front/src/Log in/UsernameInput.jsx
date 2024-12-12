import React from 'react';
import PropTypes from 'prop-types';
import { User } from 'lucide-react';

export const UsernameInput = ({ value, onChange }) => (
  <div>
    <label className="text-gray-800 text-sm mb-2 block">User name</label>
    <div className="relative flex items-center">
      <input 
        name="username"
        type="text" 
        required 
        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" 
        placeholder="Enter user name"
        value={value}
        onChange={onChange}
      />
      <User className="w-[18px] h-[18px] absolute right-4 text-gray-400" />
    </div>
  </div>
);

UsernameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
