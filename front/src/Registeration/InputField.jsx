import React from 'react';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = true 
}) => {
  return (
    <div>
      <label className="text-gray-800 text-sm mb-2 block">{label}</label>
      <input 
        name={name}
        type={type}
        minLength={ type === 'password' ? 8 : (type === 'tel' ? 11 : 3) }
        maxLength={ type === 'password' ? 16 : (type === 'tel' ? 20 : 30) }
        value={value}
        onChange={onChange}
        className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" 
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;