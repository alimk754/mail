import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = true 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">{label}</label>
      <div className="relative">
        <input 
          name={name}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          minLength={type === 'password' ? 8 : (type === 'tel' ? 11 : 3)}
          maxLength={type === 'password' ? 16 : (type === 'tel' ? 20 : 30)}
          value={value}
          onChange={onChange}
          className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all [&::-ms-reveal]:hidden [&::-webkit-inner-spin-button]:appearance-none" 
          placeholder={placeholder}
          required={required}
        />
        {type === 'password' && (
          <div 
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <Eye className="w-[18px] h-[18px]" />
            ) : (
              <EyeOff className="w-[18px] h-[18px]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;