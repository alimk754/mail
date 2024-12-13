import React, { useContext, useState } from 'react';
import { use } from 'react';
import axios from 'axios';
import { Datacontext } from '../../main';
import { Service } from './service';

import FileAttachment from '../../FileAttachment';//


const ComposeForm = () => {
  const {user,setUser}=useContext(Datacontext);
  const [importance, setImportance] = useState('medium');
  const [to,set_to]=useState("");
  const [from,set_from]=useState(user.email);
  const [content,set_content]=useState("");
  const [subject,set_subject]=useState("");
  const [error,setError]=useState(null);


  const [attachments, setAttachments] = useState([]);//



  const handleClick=async (e)=>{
    e.preventDefault();
    if (!to.trim()  || !subject.trim() || !content.trim()) {
     setError("All fields are required");
      return;
    }

    
    console.log(to);
    console.log(from);
    console.log(subject);
    console.log(content);


    try {
      const response = await axios.put('http://localhost:8080/api/message', {toemail : to,
       fromemail : from,
       message : content,
       subject:subject,
       importance: importance === "high" ? 10 : importance === "medium" ? 5 : 0, 
       });
      console.log(response);
      if (response.status === 200) {
        setError(null)
        set_to('');
        set_subject('');
        set_content('');
        setImportance('medium');
        console.log('successful:', response.data);
        setUser(response.data);
        
      }else 
        console.error('failed:', response.data.message);
      
    } catch (error) {

      setError(error.response.data.message);
    }

  }

  const options = [
    { value: 'high', label: 'High', color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', borderColor: 'border-yellow-500', textColor: 'text-yellow-600' },
    { value: 'low', label: 'Low', color: 'bg-green-500', borderColor: 'border-green-500', textColor: 'text-green-600' }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">New Message</h3>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="To"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-blue-600"
            onChange={(e)=>{set_to(e.target.value)
                            setError(e => null)}}
            value={to}
            
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="subject"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-blue-600"
            onChange={(e)=>{set_subject(e.target.value)
              setError(e => null)
            }}
            value={subject}
            required
           
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-gray-700 font-medium">Importance:</label>
            <div className={`px-2 py-1 rounded-full text-sm ${
              options.find(opt => opt.value === importance)?.textColor
            }`}>
              Selected: {options.find(opt => opt.value === importance)?.label}
            </div>
          </div>
          <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
            {options.map((option) => (
              <label
                key={option.value}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer flex-1 justify-center
                  transition-all duration-200
                  ${importance === option.value 
                    ? `bg-white shadow-md border ${option.borderColor} ${option.textColor}` 
                    : 'hover:bg-gray-100 border border-transparent'
                  }
                `}
              >
                <input
                  type="radio"
                  name="importance"
                  value={option.value}
                  checked={importance === option.value}
                  onChange={(e) =>{ setImportance(e.target.value) 
                         setError(e => null)}}
                  className="hidden"
                  required
                  
                />
                <div className={`w-3 h-3 rounded-full ${option.color} ${
                  importance === option.value ? 'shadow-lg' : ''
                }`} />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <FileAttachment 
          attachments={attachments}
          setAttachments={setAttachments}
          error={error}
          setError={setError}
        />





        <div>
          <textarea
            onChange={(e)=>{set_content(e.target.value)
              setError(e => null)
            }}
            rows={10}
            placeholder="Write your message here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-blue-600"
            value={content}
           
          />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleClick}>
            Send Message
          </button>
        </div>

        {error && (
        <div className="mt-3 text-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded flex items-center">
          <svg
            className="w-4 h-4 mr-2 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}


      </div>
    </div>
  );
};

export default ComposeForm;