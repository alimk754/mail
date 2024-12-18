import React, { useState,useContext } from 'react';
import { Datacontext } from '../../main';
import axios from 'axios';
import { handlePageReload } from './PageReload';
const SortingOptionsDiv = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const {user,setUser} =useContext(Datacontext);

  const sortOptions = [
    { value: 'FROM', label: 'sender' },
    { value: 'TO', label: 'Receiver' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'importance', label: 'Importance' },
    { value: 'subject', label: 'subject' },
    { value: 'message', label: 'body' }
  ];

  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

  const handleSortSelect = async() => {
    try {
        const response = await axios.post(`http://localhost:8080/api/sort`,{id:user.email,isAsc:isAscending,sortField:selectedSort});
        console.log(response);
        console.log(' successful:', response.data);
        setUser(u=>response.data);
        console.log(user);
       
      } catch (error) {
       
      }
    setIsVisible(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Sort Options
      </button>
      
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Sort Messages</h2>
              <p className="text-sm text-gray-500 mt-1">Choose how to organize your messages</p>
            </div>
            <div className="p-4 space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedSort(option.value)}
                  className={`w-full text-left px-4 py-3 rounded transition-colors ${
                    selectedSort === option.value 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="ascending"
                  checked={isAscending}
                  onChange={() => setIsAscending(!isAscending)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor="ascending" className="text-gray-700">
                  Ascending Order
                </label>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSortSelect}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingOptionsDiv;