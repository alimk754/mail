import React, { useContext, useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, Trash2, Undo  } from 'lucide-react';
import { Datacontext } from '../../main';
import axios from 'axios';
import MessageAttachments from './MessageAttachment';

const MessageItem = ({title, message ,handlePageReload}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, setUser } = useContext(Datacontext);
  const [showDeleteDiv, setShowDeleteDiv] = useState(false);

  const getImportanceColor = (importance)=>{
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  const retrieve = async () => {
    try {
      let bool = true;
      if (message.from === user.email) bool = false; // ( !==)
        const response = await axios.get(`http://localhost:8080/api/retrieve/${message.id}/${bool}`);
        console.log('Full response:', response);
        console.log('Response data:', response.data);
  
    } catch (error) {
        console.error('Retrieve failed:', error.response ? error.response.data : error.message);
    }
    handlePageReload();
};

const handleDeleteFromTrash = async () => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/delete/${message.id}`);

} catch (error) {
    console.error('delete failed');
}
handlePageReload();
}

  const DeleteMessage = async (bool) => {
    setShowDeleteDiv(false);
    if(message.from==user.email){
    try {
    
      const response = await axios.delete(`http://localhost:8080/api/${message.id}/${bool}`);
      console.log(response);
      if (response.status === 200) {
        
        console.log(' successful:', response.data);
      
        console.log(user);
      
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
   
        console.log(user);

    } catch (error) {
      console.error('delete failed:', error);
    }

  }
  handlePageReload();
  }

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div 
        className="p-4 grid grid-cols-12 items-center gap-4"
        
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
          {(title !== "Trash") ? <button onClick={(title === "Sent Mails") ? () => setShowDeleteDiv(true) : () => DeleteMessage(false)} className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500'>
          <Trash2 size={20} /></button> :<button onClick={retrieve} className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>
          <Undo size={20} /></button>}
        </div>

        {(title === "Trash") &&(
          <div className="col-span-1">
            <button className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500'>
            <Trash2 onClick={handleDeleteFromTrash} size={20}/></button>
          </div>
        )}

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
      {/* Conditional Delete Options Div */}
      {showDeleteDiv && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowDeleteDiv(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">Delete Options</h2>
            <p className="text-gray-600">Choose how you want to delete the message:</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => DeleteMessage(false)}
              >
                Delete for Me
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => DeleteMessage(true)}
              >
                Delete for Everyone
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteOptions(false)}
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

const MessageList = ({title, messages,handlePageReload }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem title = {title} key={message.id} message={message} handlePageReload={handlePageReload} />
      ))}
    </div>
  );
};

export default MessageList;