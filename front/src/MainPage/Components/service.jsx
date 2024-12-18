import { Search, Filter, SortAsc, X } from 'lucide-react';
import SortingOptionsMenu from './sort_button';
import RenameDiv from './Rename_Button';
import FilterOptionsDiv from './FilterButton'

export const Service = ({
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
  title,
  navigateSection,
  searchBy,
  onSearchByChange,
  setError
}) => {
  const getPlaceholderText = (searchByValue) => {
    switch (searchByValue) {
      case 'subject':
        return 'Enter email subject';
      case 'sender':
        return 'Enter sender name';
      case 'receiver':
        return 'Enter receiver name';
      case 'content':
        return 'Enter message content';
      case 'time':
        return 'Enter date (YYYY-MM-DD)';
      case 'attachment':
        return 'Enter attachment name';
      case 'importance':
        return 'Enter low, medium, or high';
      default:
        return 'Select search option first';
    }
  };

 
  return (
    <div className="relative bg-white mb-6 rounded-lg space-y-4">

      {title!=="Contacts"?<div className="relative mb-6">
        <div className="flex space-x-4">
          
          <div className="w-48">
            <select
              value={searchBy}
              onChange={(e) => onSearchByChange(e.target.value)}
              className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select search option</option>
              <option value="subject">Subject</option>
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
              <option value="content">Content</option>
              <option value="time">Date</option>
              <option value="attachment">Attachment</option>
              <option value="importance">Importance</option>
            </select>
          </div>
          
          
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={getPlaceholderText(searchBy)}
              list={searchBy === 'importance' ? 'importance-options' : undefined}
              className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
      </div>:<></>}

      {title === "Contacts" ? (
        <></>
      ) : (
        <div className="mt-4 flex justify-end space-around space-x-6">
          <SortingOptionsMenu setError={setError}></SortingOptionsMenu>
          <FilterOptionsDiv setError={setError}></FilterOptionsDiv>
        </div>
      )}

      {title!=="Contacts"&&title!=="Inbox"&&title!=="Sent Mails"&&title!=="Trash"&&title!=="Drafts"? (
        <RenameDiv setError={setError} title={title} navigateSection={navigateSection}></RenameDiv>
      ) : (
        <></>
      )}
    </div>
  );
};