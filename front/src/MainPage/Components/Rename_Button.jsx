import React, { useState,useContext } from 'react';
import { Datacontext } from '../../main';
import { HandleRename } from '../../apiController/RenameController';
const RenameDiv = ({title,navigateSection,setError}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {user,setUser} =useContext(Datacontext);
  const [error,setERror]=useState(null);


  const [selectedname, setSelected] = useState("");

  const handleRename = async() => {
      HandleRename(user,setERror,setIsVisible,navigateSection,selectedname,title,setUser)
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-500 mr-4 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Rename
      </button>
      
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
          <div className="bg-white rounded-lg shadow-xl w-96 max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Renaming Folder</h2>
              <p className="text-sm text-gray-500 mt-1">Choose a new name</p>
            </div>
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
            <div className="p-4 space-y-2">
            <input 
            type="text"
            placeholder="Name"
            onChange={(e) => {setSelected(e.target.value);setERror(null);}}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
             
              <div className="flex space-x-2">
                <button 
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRename}
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

export default RenameDiv;