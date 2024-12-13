import React, { useState,useContext } from 'react';
import MessageList from './Messaga_generator';
import { Datacontext } from '../../main';
import { Service } from './service';
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
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
      <button
          className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
          onClick={handlePageReload}
      >
          <RefreshCcw className="mr-2" size={18} />
      </button>
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
       <MessageList messages={messages} />
      </div>
    </div>
  );
};

export default ContentSection;