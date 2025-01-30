import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

const SearchContact = ({ onSearch, searchPlaceholder = "Search contacts" }) => {
  const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = (searchTerm) => {
      
      console.log('Searching for:', searchTerm);
      const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

  
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    onSearch(value);
  }, [onSearch]);

  
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="relative bg-white mb-6 rounded-lg space-y-4">
      <div className="relative mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContact;