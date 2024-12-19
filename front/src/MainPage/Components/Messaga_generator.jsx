import React, { useContext, useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, Trash2, Undo, Move } from 'lucide-react';
import { Datacontext } from '../../main';
import axios from 'axios';
import MessageAttachments from '../../Attachments/MessageAttachment';
import DeleteOptions from './DeleteOptions';
import WarningModel from './WarinigModel';

const MessageItem = ({
  handleDeleteDraft,
  handleDoubleCLicking,
  title,
  message,
  handlePageReload,
  isSelected,
  onSelect,
  onMessageUpdate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, setUser } = useContext(Datacontext);
  const [showDeleteDiv, setShowDeleteDiv] = useState(false);
  const [showDeleteWar, setShowDeleteWar] = useState(false);

  const getImportanceColor = (importance) => {
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const DeleteFromCategory = async () => {
    try {
      let checkUser = (message.from === user.email);
      let bool = true;
      if (message.from === user.email) bool = false;
      const response = await axios.delete(`http://localhost:8080/api/folder/${user.email}/${title}/${message.id}`);
      console.log('Full response:', response);
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Retrieve failed:', error.response ? error.response.data : error.message);
    }
    handlePageReload(user, setUser);
  };


  const retrieve = async () => {
    try {
      let checkUser = (message.from === user.email);
      let bool = true;
      if (message.from === user.email) bool = false;
      const response = await axios.get(`http://localhost:8080/api/retrieve/${message.id}/${bool}/${checkUser}`);
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      onMessageUpdate(message.id)
    } catch (error) {
      console.error('Retrieve failed:', error.response ? error.response.data : error.message);
    }
    handlePageReload(user, setUser);
  };

  const handleDeleteFromTrash = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/delete/${message.id}`);
    } catch (error) {
      console.error('delete failed');
    }
    handlePageReload(user, setUser);
  };

  const DeleteMessage = async (bool) => {
    setShowDeleteDiv(false);
    if (message.from == user.email) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/${message.id}/${bool}`);
        if (response.status === 200) {
        } else
          console.error(' failed:', response.data.error);
      } catch (error) {
        console.error('delete failed:', error);
      }
    } else {
      try {
        const response = await axios.delete(`http://localhost:8080/api/mess/${message.id}`);
        console.log(response);
        console.log(' successful:', response.data);
        setUser(u => response.data);
        console.log(user);
      } catch (error) {
        console.error('delete failed:', error);
      }
    }
    handlePageReload(user, setUser);
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg mb-4 border ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100'
      } hover:shadow-lg transition-shadow duration-300`}
      onDoubleClick={() => handleDoubleCLicking(message)}
    >
      <div className="p-4 grid grid-cols-12 items-center gap-4">
        {/* Checkbox Column */}
        <div className="col-span-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(message.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* From Column */}
        <div className="col-span-2 flex items-center space-x-2">
          <User className="text-gray-500" size={16} />
          <span className="font-semibold text-gray-700 truncate">
            from: {user.email === message.from ? "You" : message.from}
          </span>
        </div>

        {/* To Column */}
        <div className="col-span-2 flex items-center space-x-2">
          <User className="text-gray-500" size={16} />
          <span className="font-semibold text-gray-700 truncate">
            to: {user.email === message.to ? "You" : message.to}
          </span>
        </div>

        {/* Subject Column - Adjusted for Trash view */}
        <div className={`${title === "Trash" ? "col-span-2" : "col-span-3"} overflow-hidden`}>
          <h3 className="text-lg font-bold text-gray-800 truncate">
            Subject: {message.subject}
          </h3>
        </div>

        {/* Timestamp Column */}
        <div className="col-span-2 flex items-center text-sm text-gray-500">
          <Clock className="mr-2" size={14} />
          <span className="truncate">{message.createdAt}</span>
        </div>

        {/* Action Buttons Column - Adjusted for Trash view */}
        <div className={`${title === "Trash" ? "col-span-2" : "col-span-1"} flex justify-end space-x-2`}>
          {title === "Trash" ? (
            <>
              <button
                onClick={retrieve}
                className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
              >
                <Undo size={20} />
              </button>
              
            </>
          ) : null}
        </div>

        {/* Importance and Expand Icon Column */}
        <div className="col-span-1 flex items-center justify-end space-x-2">
          <div
            className={`${getImportanceColor(message.importance)} w-4 h-4 rounded-full`}
            title={`Importance: ${message.importance}`}
          />
          {isExpanded ? (
            <ChevronUp
              className="cursor-pointer transition-all duration-300 ease-in-out transform hover:text-red-500 hover:scale-110"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          ) : (
            <ChevronDown
              className="cursor-pointer transition-all duration-300 ease-in-out transform hover:text-blue-500 hover:scale-110"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-gray-100 border-t">
          <div className="mb-2">
            <MessageAttachments attachments={message.attachments} />
            <p className="text-gray-700 break-all">{message.message}</p>
          </div>
        </div>
      )}

      {/* Modals */}
      {title === "Drafts" && (
        <WarningModel
          isOpen={showDeleteWar}
          onClose={() => setShowDeleteWar(false)}
          onConfirm={() => handleDeleteDraft(message.id)}
          title="Delete This Draft"
          message={`Are you sure you want to delete this Draft?`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}

      {title !== "Drafts" && (
        <WarningModel
          isOpen={showDeleteWar}
          onClose={() => setShowDeleteWar(false)}
          onConfirm={handleDeleteFromTrash}
          title="Delete This Messages"
          message={`Are you sure you want to delete this message from Trash?`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}

      {showDeleteDiv && (
        <DeleteOptions
          onClose={() => setShowDeleteDiv(false)}
          onDeleteForMe={() => DeleteMessage(false)}
          onDeleteForEveryone={() => DeleteMessage(true)}
        />
      )}
    </div>
  );
};

const MessageList = ({
  handleDeleteDraft,
  handleDoubleCLicking,
  title,
  messages,
  handlePageReload,
}) => {
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [showBulkDeleteWarning, setShowBulkDeleteWarning] = useState(false);
  const { user, setUser } = useContext(Datacontext);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [errorOcurred, setErrorOcurred] = useState(null);
  const [showDeleteOp, setShowDeleteOp] = useState(false);

  const [currentMessages, setCurrentMessages] = useState(messages); //

  React.useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  const handleMessageUpdate = (messageId) => {//////////////////////////////////
    setCurrentMessages(prevMessages => 
      prevMessages.filter(message => message.id !== messageId)
    );
  };

  const handleSelectMessage = (messageId, isSelected) => {
    setSelectedMessages(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(messageId);
      } else {
        newSet.delete(messageId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedMessages(new Set(messages.map(m => m.id)));
    } else {
      setSelectedMessages(new Set());
    }
  };

  const handleBulkMove = async () => {
    try{
      console.log(selectedMessages);
      console.log(user.email);
      console.log(categoryName);
      const response = await axios.put(`http://localhost:8080/api/folder/${user.email}/${Array.from(selectedMessages)}/${categoryName}`);
    
      setCurrentMessages(prev => 
        prev.filter(message => !selectedMessages.has(message.id))
      );
    
    }catch(error){
      setErrorOcurred(error.response.data.message);
      return;
    }
    setShowMoveOptions(false);
    setSelectedMessages(new Set());
    setCategoryName('');
    handlePageReload(user, setUser);
  };

  const handleBulkDelete = async (bool = false) => {
    console.log(selectedMessages);

    try {
      if (title === "Trash") {
        const response = await axios.delete(`http://localhost:8080/api/delet/${Array.from(selectedMessages)}`);
        console.log(response);
      }
          else if (title === "Drafts") {
            await axios.delete(`http://localhost:8080/api/deleteDrafts/${Array.from(selectedMessages)}`);
          } else if (title !== "Inbox" && title !== "Sent Mails" && title !== "Draft") {
            await axios.delete(`http://localhost:8080/api/folder/folders/${user.email}/${title}/${Array.from(selectedMessages)}`);
          } else if (title==="Sent Mails") {
              await axios.delete(`http://localhost:8080/api/aa/${Array.from(selectedMessages)}/${bool}`);
              setShowDeleteOp(false);
            } else {
              await axios.delete(`http://localhost:8080/api/mess/aa/${Array.from(selectedMessages)}`);
            }
          
            setCurrentMessages(prev => 
              prev.filter(message => !selectedMessages.has(message.id))
            );
      
      setSelectedMessages(new Set());
      await handlePageReload(user, setUser);
      setShowBulkDeleteWarning(false);
    } catch (error) {
      console.error('Bulk delete failed:', error);
    }
  };

  return (
    <div className="space-y-4">
      
      {currentMessages.length > 0 && (
        <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedMessages.size === messages.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {selectedMessages.size} selected
            </span>
          </div>

          {selectedMessages.size > 0 && (
            <div className="flex items-center space-x-4">
              {(title !== "Trash" && title !== "Drafts") && <button
                onClick={() => setShowMoveOptions(true)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Move size={16} />
                <span>Move Selected</span>
              </button>}
              
              <button
                onClick={(title === "Sent Mails") ? () => setShowDeleteOp(true) : () => setShowBulkDeleteWarning(true)}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} />
                <span>Delete Selected</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Message List */}
      {currentMessages.map((message) => (//
        <MessageItem
          handleDeleteDraft={handleDeleteDraft}
          handleDoubleCLicking={handleDoubleCLicking}
          title={title}
          key={message.id}
          message={message}
          handlePageReload={handlePageReload}
          isSelected={selectedMessages.has(message.id)}
          onSelect={handleSelectMessage}

          onMessageUpdate={handleMessageUpdate} //////////////////////////////////
        />
      ))}

      {(title !== "Sent Mails") && <WarningModel
        isOpen={showBulkDeleteWarning}
        onClose={() => setShowBulkDeleteWarning(false)}
        onConfirm={handleBulkDelete}
        title="Delete Selected Messages"
        message={`Are you sure you want to delete ${selectedMessages.size} selected message(s)?`}
        confirmText="Yes, Delete All"
        cancelText="Cancel"
      />}

      {(title === "Sent Mails")
      && showDeleteOp && <DeleteOptions
        onClose={() => setShowDeleteOp(false)}
        onDeleteForMe={() => handleBulkDelete(false)}
        onDeleteForEveryone={() => handleBulkDelete(true)}
        />}

      {/* Move Options Modal */}
      {showMoveOptions && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-96">
            <h3 className="text-lg font-bold mb-4">Move to Category</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errorOcurred && (
        <div className="error-message mt-2 flex items-center">
          <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {errorOcurred}
        </div>
      )}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowMoveOptions(false);
                    setCategoryName('');
                    setSelectedMessages(new Set());
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkMove}
                  disabled={!categoryName.trim()}
                  className={`px-4 py-2 text-white rounded ${
                    categoryName.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;