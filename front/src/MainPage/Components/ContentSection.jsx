import React, { useState, useContext } from "react";
import MessageList from "./Messaga_generator";
import { Datacontext } from "../../main";
import { Service } from "./service";
import axios from "axios";
import { RefreshCcw, Trash2 } from "lucide-react";
import { handlePageReload } from './PageReload';
import WarningModel from './WarinigModel';
const ContentSection = ({
  handleDeleteDraft,
  title,
  children,
  onSearch,
  onSort,
  onFilter,
  searchPlaceholder = "Search...",
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

  const getMessageList = () => {
    switch (title) {
      case "Inbox":
        return user.in || [];
      case "Sent Mails":
        return user.out || [];
      case "Trash":
        return user.trash || [];
        case "Drafts":
        return user.drafts || [];
      default:
        return messages || [];
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!searchBy) return;

    const currentMessages = getMessageList();
    if (value.trim() === "") {
      setFilteredMessages(currentMessages);
    } else {
      const searchValue = value;
      const searchResults = currentMessages.filter((message) => {
        // console.log(message);
        switch (searchBy) {
          case "subject":
            return message.subject?.includes(searchValue);
          case "sender":
            return message.from?.includes(searchValue);
          case "receiver":
            return message.to?.includes(searchValue);
          case "content":
            return message.message?.includes(searchValue);
          case "time":
            return message.createdAt?.includes(searchValue);
          case "attachment":
            if (!Array.isArray(message.attachments)) return false;
            return message.attachments.some(attachment => 
              attachment?.fileName?.includes(searchValue)
            );
            
          case "importance":
            let imp;
            if (message.importance === 0) imp = "low";
            else if (message.importance === 10) imp = "high";
            else imp = "medium";
            return imp?.includes(searchValue);
          default:
            return false;
        }
      });
      setFilteredMessages(searchResults);
    }
  };

  const handleSearchByChange = (value) => {
    setSearchBy(value);

    setSearchTerm("");
    setFilteredMessages(getMessageList());
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredMessages(getMessageList());
  };

  const handleDeleteAll = async (e) => {
    try {

    setShowWarining(false);
    const response = await axios.put('http://localhost:8080/api/deleteALl', 
      
       { trash: user.trash }
    );
      if (response.status === 200) {
        console.log('DeleteAll successful:');
        
      }else 
        console.error('DeleteAll failed:');
      
    } catch (error) {
      console.error('DeleteAll failed:', error);
    }
    handlePageReload(user,setUser);
  }
  const handleDeleteAllDrafts = async (e) => {
    try{
      setShowWarining(false);
      const response = await axios.put('http://localhost:8080/api/deleteALl', 
       { drafts: user.drafts }
    );
      if (response.status === 200) {
        console.log('DeleteAll successful:');
        
      }else 
        console.error('DeleteAll failed:');
    }catch(error){
      console.error(error);
    }
    handlePageReload(user,setUser);
  }

  const deleteCategory = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/folder/delete/${title}/${user.email}`
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setUser((u) => response.data);
        console.log(user);
      } else console.error("Login failed:", response.data.error);
    } catch (error) {
      console.error("Login failed:", error);
    }
    handlePageReload(user,setUser);
    navigateSection("compose");
  };

  return (
    <div>
      <div className="flex items-center text-gray-500 font-medium text-sm justify-between space-x-2">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
        <div className="flex">
          <button
            className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
            onClick={() => handlePageReload(user,setUser)}
          >
            <RefreshCcw className="mr-2" size={18} />
          </button>
          {!(
            title === "Inbox" ||
            title === "Contacts" ||
            title === "Sent Mails"
          ) && (
            <button className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500">
              <Trash2 onClick={(title==="Trash" || title==="Drafts")?() => setShowWarining(true): deleteCategory} className="mr-2" size={18} />
            </button>
          )}
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
      />
      <div>
      <MessageList handleDeleteDraft={handleDeleteDraft} handleDoubleCLicking={handleDoubleCLicking} title={title} messages={searchTerm.trim() ? filteredMessages : getMessageList()} handlePageReload={() => handlePageReload(user,setUser)}/>
      </div>

           {/* Conditional Warning Div */}
           {(title === "Trash") && <WarningModel isOpen={showWarning} onClose={() => setShowWarining(false)} onConfirm={handleDeleteAll} title="Warning" message="Are you sure to Delete All Messages?" confirmText="Confirm" cancelText="Cancel" />}
      {(title === "Drafts") && <WarningModel isOpen={showWarning} onClose={() => setShowWarining(false)} onConfirm={handleDeleteAllDrafts} title="Warning" message="Are you sure to Delete All Drafts?" confirmText="Confirm" cancelText="Cancel" />}
    </div>
  );
};

export default ContentSection;