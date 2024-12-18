import React, { useState,useContext } from 'react';
import { Datacontext} from '../../main'
import axios from 'axios';
import { handlePageReload } from './PageReload';
const FilterOptionsDiv = ({setError}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {user,setUser} =useContext(Datacontext);
  
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedSender, setSelectedSender] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const handleFilter = async() => {
    try{
        const response = await axios.put(`http://localhost:8080/api/filter`,{receiver:user.email,Sender:selectedSender,subject:selectedSubject,directory:selectedFolder});
        setError(null);
      } catch (error) {
        setError(error.response.data.message);
      }
    setIsVisible(false);
    handlePageReload(user,setUser);
    
  };
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      >
        Filter Options
      </button>
      
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Filter Messages</h2>
              <p className="text-sm text-gray-500 mt-1">Choose how to organize your messages</p>
            </div>
            <div className="p-4 space-y-2">
            <div className="p-4 space-y-2">
            <input 
            type="text"
            placeholder="Name of the Sender"
            onChange={(e) => setSelectedSender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className="p-4 space-y-2">
            <input 
            type="text"
            placeholder="Name of the Folder"
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className="p-4 space-y-2">
            <input 
            type="text"
            placeholder="Name of the Subject"
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
              
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
                  onClick={handleFilter}
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

export default FilterOptionsDiv;