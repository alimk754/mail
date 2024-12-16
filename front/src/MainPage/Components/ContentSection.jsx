import React, { useState,useContext } from 'react';
import MessageList from './Messaga_generator';
import { Datacontext } from '../../main';
import { Service } from './service';
import axios from 'axios';
import { RefreshCcw, Trash2 } from 'lucide-react';
import { handlePageReload } from './PageReload';
import WarningModel from './WarinigModel';
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
    setShowWarining(false);
    const response = await axios.put('http://localhost:8080/api/deleteALl',  
       { trash: user.trash }
    );
      if (response.status === 200) {
        console.log('Delete successful:');
        
      }else 
        console.error('De;ete failed:');
      
    } catch (error) {
      console.error('Delete failed:', error);
    }
    handlePageReload(user , setUser);
  }

  return (
    <div>
      <div className='flex items-center text-gray-500 font-medium text-sm justify-between space-x-2'>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {title}
      </h3>
      <div className='flex'>
      <button
          className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
          onClick={() => handlePageReload(user , setUser)}
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

      {/* Warning Modal */}
      <WarningModel 
        isOpen={showWarning}
        onClose={() => setShowWarining(false)}
        onConfirm={(e) => handleDeleteAll (e)}
        title="Delete All Messages"
        message={`Are you sure you want to delete all messages in Trash?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ContentSection;