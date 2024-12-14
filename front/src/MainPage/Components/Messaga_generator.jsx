import React, { useContext, useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, Trash2, Undo  } from 'lucide-react';
import { Datacontext } from '../../main';
import axios from 'axios';
import MessageAttachments from './MessageAttachment';

const MessageItem = ({title, message ,handlePageReload}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, setUser } = useContext(Datacontext);

  const getImportanceColor = (importance)=>{
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  const retrieve = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/retrieve/${message.id}`);
        console.log('Full response:', response);
        console.log('Response data:', response.data);
        setUser(response.data);
    } catch (error) {
        console.error('Retrieve failed:', error.response ? error.response.data : error.message);
    }
    handlePageReload();
};

  const DeleteMessage = async () => {
    if(message.from==user.email){
    try {
    
      const response = await axios.delete(`http://localhost:8080/api/${message.id}`);
      console.log(response);
      if (response.status === 200) {
        
        console.log(' successful:', response.data);
        setUser(u=>response.data);
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
        setUser(u=>response.data);
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
        <div className="col-span-4">
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
          {(title !== "Trash") ? <button onClick={(e) => DeleteMessage(e)} className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500'>
          <Trash2 size={20} /></button> :<button className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>
          <Undo size={20} onClick={retrieve}/></button>}
        </div>

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