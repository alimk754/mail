import React, { useContext, useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, Trash2, Undo  } from 'lucide-react';
import { Datacontext } from '../../main';
import axios from 'axios';
import MessageAttachments from './MessageAttachment';
import DeleteOptions from './DeleteOptions';
import WarningModel from './WarinigModel';

const MessageItem = ({handleDeleteDraft,handleDoubleCLicking, title, message ,handlePageReload}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, setUser } = useContext(Datacontext);
  const [showDeleteDiv, setShowDeleteDiv] = useState(false);
  const [showDeleteWar, setShowDeleteWar] = useState(false);

  const getImportanceColor = (importance)=>{
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  const DeleteFromCategory=async()=>{
    console.log("Gggg");
    try {
      let checkUser = (message.from === user.email);
      let bool = true;
      if (message.from === user.email) bool = false; // ( !==)
        const response = await axios.delete(`http://localhost:8080/api/folder/${user.email}/${title}/${message.id}`);
        console.log('Full response:', response);
        console.log('Response data:', response.data);
       
    } catch (error) {
        console.error('Retrieve failed:', error.response ? error.response.data : error.message);
    }
    handlePageReload(user, setUser);
  }
  const retrieve = async () => {
    try {
      let checkUser = (message.from === user.email);
      let bool = true;
      if (message.from === user.email) bool = false; // ( !==)
        const response = await axios.get(`http://localhost:8080/api/retrieve/${message.id}/${bool}/${checkUser}`);
        console.log('Full response:', response);
        console.log('Response data:', response.data);
       
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
handlePageReload(user , setUser);
}

  const DeleteMessage = async (bool) => {
    setShowDeleteDiv(false);
    if(message.from==user.email){
    try {
    
      const response = await axios.delete(`http://localhost:8080/api/${message.id}/${bool}`);
      // console.log(response);
      if (response.status === 200) {
        
        // console.log(' successful:', response.data);
        // setUser(u=>response.data);
        // console.log(user);
      
      }else 
        console.error(' failed:', response.data.error);
      
    } catch (error) {
      console.error('delete failed:', error);
    }
  }
  else{
    try {
    
      const response = await axios.delete(`http://localhost:8080/api/mess/${message.id}`);
      console.log(response);
        
        console.log(' successful:', response.data);
        setUser(u=>response.data);
        console.log(user);

    } catch (error) {
      console.error('delete failed:', error);
    }

  }
  handlePageReload(user, setUser);
  }

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    onDoubleClick={() => handleDoubleCLicking(message)}>
      <div 
        className="p-4 grid grid-cols-12 items-center gap-4"
        draggable
      >
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

        {/* Subject Column */}
        <div className={title === "Trash" ? "col-span-3" : "col-span-4"}>
          <h3 className="text-lg font-bold text-gray-800 truncate">
            Subject: {message.subject}
          </h3>
        </div>

        {/* Timestamp Column */}
        <div className="col-span-2 flex items-center text-sm text-gray-500">
          <Clock className="mr-2" size={14} />
          <span className="truncate">{message.createdAt}</span>
        </div>

        <div className="col-span-1">
          {(title !== "Trash") ? <button onClick={(title === "Sent Mails") ? () => setShowDeleteDiv(true) : (title === "Drafts" ? () => setShowDeleteWar(true) :title!=="Inbox"&&title!=="Sent Mails"&&title!=="Trash"&&title!=="Contacts"?()=>{DeleteFromCategory()}: () => DeleteMessage(false))} className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500'>
          <Trash2 size={20} /></button> : <button onClick={retrieve} className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>
          <Undo size={20} /></button>} 
        </div>

        {(title === "Trash") &&(
          <div className="col-span-1">
            <button className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500'>
            <Trash2 onClick={() => setShowDeleteWar(true)} size={20}/></button>
          </div>
        )}

        {/* Warning Modal */}
        {(title === "Drafts") && <WarningModel 
        isOpen={showDeleteWar}
        onClose={() => setShowDeleteWar(false)}
        onConfirm={() => handleDeleteDraft(message.id)}
        title="Delete This Draft"
        message={`Are you sure you want to delete this Draft?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
       />}

        {/* Warning Modal */}
      {(title !== "Drafts") && <WarningModel 
        isOpen={showDeleteWar}
        onClose={() => setShowDeleteWar(false)}
        onConfirm={handleDeleteFromTrash}
        title="Delete This Messages"
        message={`Are you sure you want to delete this message from Trash?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />}

        {/* Importance and Expand Icon Column */}
        <div className="col-span-1 flex items-center justify-end space-x-2">
          <div 
            className={`${getImportanceColor(message.importance)} w-4 h-4 rounded-full`}
            title={`Importance: ${message.importance}`}
          />
          {isExpanded ? <ChevronUp className='cursor-pointer transition-all duration-300 ease-in-out transform hover:text-red-500 hover:scale-110' onClick={() => setIsExpanded(!isExpanded)}/> 
          : <ChevronDown className='cursor-pointer transition-all duration-300 ease-in-out transform hover:text-blue-500 hover:scale-110' onClick={() => setIsExpanded(!isExpanded)}/>}
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
      {/* Conditional Delete Options Modal */}
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

const MessageList = ({handleDeleteDraft,handleDoubleCLicking, title, messages,handlePageReload }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem handleDeleteDraft={handleDeleteDraft} handleDoubleCLicking={handleDoubleCLicking} title = {title} key={message.id} message={message} handlePageReload={handlePageReload} />
      ))}
    </div>
  );
};

export default MessageList;