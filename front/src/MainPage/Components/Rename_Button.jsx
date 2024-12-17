import React, { useState,useContext } from 'react';
import { Datacontext } from '../../main';
import axios from 'axios';
import { handlePageReload } from './PageReload';
const RenameDiv = ({title,navigateSection}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {user,setUser} =useContext(Datacontext);


  const [selectedname, setSelected] = useState("");

  const handleRename = async() => {
    try {
        console.log(user.email,selectedname,title);
        const response = await axios.put(`http://localhost:8080/api/folder/rename`,{email:user.email,name:selectedname,oldName:title});
        
      } catch (error) {
        console.error('delete failed:', error);
      }
    setIsVisible(false);
    navigateSection(selectedname);
    handlePageReload(user,setUser);
    
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
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
            <div className="p-4 space-y-2">
            <input 
            type="text"
            placeholder="Name"
            onChange={(e) => setSelected(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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