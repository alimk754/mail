import { Search, Filter, SortAsc, X } from 'lucide-react';
export const Service=({
    handleClearSearch, 
        onSort,
        onFilter,
        handleSearchChange,
        searchPlaceholder,
        sortLabel,
        filterLabel,  
        user,
        setUser,
        searchTerm,
        setSearchTerm,
})=>{

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
   
          <div className="mt-4 flex justify-end space-around space-x-6">  {/* Increased space-x from space-x-3 to space-x-6 */}
           <button
             onClick={onSort}
             className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
           >
             <SortAsc size={18} className="mr-2" />
             {sortLabel}
           </button>
           <button
             onClick={onFilter}
             className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
           >
             <Filter size={18} className="mr-2" />
             {filterLabel}
           </button>
          </div>
         </div>
    );
}