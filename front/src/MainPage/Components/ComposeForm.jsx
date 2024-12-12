import React, { useState } from 'react';

const ComposeForm = () => {
  const [importance, setImportance] = useState('medium');
  
  const options = [
    { value: 'high', label: 'High', color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', borderColor: 'border-yellow-500', textColor: 'text-yellow-600' },
    { value: 'low', label: 'Low', color: 'bg-green-500', borderColor: 'border-green-500', textColor: 'text-green-600' }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">New Message</h3>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="To"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-blue-600"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-blue-600"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-gray-700 font-medium">Importance:</label>
            <div className={`px-2 py-1 rounded-full text-sm ${
              options.find(opt => opt.value === importance)?.textColor
            }`}>
              Selected: {options.find(opt => opt.value === importance)?.label}
            </div>
          </div>
          <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
            {options.map((option) => (
              <label
                key={option.value}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer flex-1 justify-center
                  transition-all duration-200
                  ${importance === option.value 
                    ? `bg-white shadow-md border ${option.borderColor} ${option.textColor}` 
                    : 'hover:bg-gray-100 border border-transparent'
                  }
                `}
              >
                <input
                  type="radio"
                  name="importance"
                  value={option.value}
                  checked={importance === option.value}
                  onChange={(e) => setImportance(e.target.value)}
                  className="hidden"
                />
                <div className={`w-3 h-3 rounded-full ${option.color} ${
                  importance === option.value ? 'shadow-lg' : ''
                }`} />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <textarea
            rows={10}
            placeholder="Write your message here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-blue-600"
          />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeForm;