import React, { useState, useContext } from "react";
import MessageList from "./Messaga_generator";
import { Datacontext } from "../../main";
import { Service } from "./service";
import { handleSearchChange as HandleSearchChange,getMessageList } from "../../apiController/SearchingController";
import { RefreshCcw, Trash} from "lucide-react";
import { handlePageReload } from "./PageReload";
import WarningModel from "./WarningModel";
import RenameDiv from "./Rename_Button";
import { handleDeleteAll as HandleDeleteAll } from "../../apiController/deleteController";
import { HandleCategoryDelete,HandleDeleteAllDrafts } from "../../apiController/DeleteController2";
const ContentSection = ({
  handleDeleteDraft,
  title,
  onSort,
  onFilter,
  sortLabel = "Sort",
  filterLabel = "Filter",
  handleDoubleCLicking,
  messages = [],
  navigateSection,
}) => {
  const { user, setUser } = useContext(Datacontext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showWarning, setShowWarining] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [searchBy, setSearchBy] = useState("subject");
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    HandleSearchChange(e,setSearchTerm,searchBy,setFilteredMessages)
  };

  const handleSearchByChange = (value) => {
    setSearchBy(value);

    setSearchTerm("");
    setFilteredMessages(getMessageList(title,user,messages));
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredMessages(getMessageList(title,user,messages));
  };

  const handleDeleteAll = async (e) => {
    HandleDeleteAll(user,setUser,setShowWarining);
  };
  const handleDeleteAllDrafts = async (e) => {
    HandleDeleteAllDrafts(user,setUser,setShowWarining);
  };

  const deleteCategory = async () => {
   HandleCategoryDelete(title,user,setUser,setError,navigateSection);
  };

  return (
    <div>
      <div className="flex items-center text-gray-500 font-medium text-sm justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
        </div>
        <div className="flex">
        {title !== "Contacts" &&
          title !== "Inbox" &&
          title !== "Sent Mails" &&
          title !== "Trash" &&
          title !== "Drafts" ? (
            <>
            <RenameDiv
              setError={setError}
              title={title}
              navigateSection={navigateSection}
            />
               <button
            className="text-red-600 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500"
            onClick={deleteCategory}
          >
            <Trash className="mr-2" size={18} />
           </button>
            </>
          ) : (
            <></>
            
          )}
          <button
            className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
            onClick={() => handlePageReload(user, setUser)}
          >
            <RefreshCcw className="mr-2" size={18} />
           </button>
          
        </div>
      </div>
      <Service
        handleClearSearch={handleClearSearch}
        onSort={onSort}
        onFilter={onFilter}
        handleSearchChange={handleSearchChange}
        searchPlaceholder={
          searchBy ? `Search by ${searchBy}...` : "Select search option first"
        }
        sortLabel={sortLabel}
        filterLabel={filterLabel}
        user={user}
        setUser={setUser}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        title={title}
        navigateSection={navigateSection}
        searchBy={searchBy}
        onSearchByChange={handleSearchByChange}
        setError={setError}
      />
      <div>
        <MessageList
          handleDeleteDraft={handleDeleteDraft}
          handleDoubleCLicking={handleDoubleCLicking}
          title={title}
          messages={searchTerm.trim() ? filteredMessages : getMessageList(title,user,messages)}
          handlePageReload={() => handlePageReload(user, setUser)}
        />
      </div>

      
      {title === "Trash" && (
        <WarningModel
          isOpen={showWarning}
          onClose={() => setShowWarining(false)}
          onConfirm={handleDeleteAll}
          title="Warning"
          message="Are you sure to Delete All Messages?"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}
      {title === "Drafts" && (
        <WarningModel
          isOpen={showWarning}
          onClose={() => setShowWarining(false)}
          onConfirm={handleDeleteAllDrafts}
          title="Warning"
          message="Are you sure to Delete All Drafts?"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}
    
    </div>
  );
};

export default ContentSection;
