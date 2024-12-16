import React, { useState,useContext } from 'react';
import MessageList from './Messaga_generator';
import { Datacontext } from '../../main';
import { Service } from './service';
import axios from 'axios';
import { RefreshCcw, Trash2 } from 'lucide-react';
const ContentSection = ({
   title,
   children,
   onSearch,
   onSort,
   onFilter,
   searchPlaceholder = "Search...",
   sortLabel = "Sort",
   filterLabel = "Filter",
   messages=[]
}) => {

  const {user,setUser} =useContext(Datacontext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showWarning , setShowWarining] = useState(false);
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
    console.log(user);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch && onSearch('');
  };

  const handleDeleteAll = async (e) => {
    try {

    const response = await axios.put('http://localhost:8080/api/deleteALl', 
       { trash: user.trash }
    );
      if (response.status === 200) {
        console.log('Login successful:');
        
      }else 
        console.error('Login failed:');
      
    } catch (error) {
      console.error('Login failed:', error);
    }
    handlePageReload();
  }

  const handlePageReload = async (e) => {

    try {
      const response = await axios.post('http://localhost:8080/api/mail/login', {email : user.email, password : user.password});
      console.log(response);
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setUser(u=>response.data);
        console.log(user);
      }else 
        console.error('Login failed:', response.data.error);
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <div className='flex items-center text-gray-500 font-medium text-sm justify-between space-x-2'>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {title}
      </h3>
      <div className='flex'>
      <button
          className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
          onClick={handlePageReload}
      >
          <RefreshCcw className="mr-2" size={18} />
      </button>
      {(title === "Trash") && <button
          className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500"
          
      >
          <Trash2 onClick={() => setShowWarining(true)} className="mr-2" size={18} />
      </button>}
      </div>
      </div>
      <Service 
        handleClearSearch={handleClearSearch} 
        onSort={onSort}
        onFilter={onFilter}
        handleSearchChange={handleSearchChange}
        searchPlaceholder={searchPlaceholder}
        sortLabel={sortLabel}
        filterLabel={filterLabel}  
        user={user}
        setUser={setUser}
        searchTerm={searchTerm}
        setSearchTerm={searchTerm}
        />
      <div>
       <MessageList title={title} messages={messages} handlePageReload={handlePageReload}/>
      </div>

      {/* Conditional Warning Div */}
      {showWarning && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowWarining(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">Warning</h2>
            <p className="text-gray-600">Are you sure you want to delete All message?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={(e) => handleDeleteAll (e)}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowWarining(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSection;