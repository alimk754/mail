import React, { useContext, useState } from 'react';
import { use } from 'react';
import axios from 'axios';
import { Datacontext } from '../main';


import FileAttachment from '../Attachments/FileAttachment';
 import './ComposeForm.css';
 import { handlePageReload } from '../MainPage/Components/PageReload';
import MessageAttachments from '../Attachments/MessageAttachment';

 const ComposeForm = ({recipients, setRecipients, to, from, importance, subject, content, attachments ,setAttachments,setImportance,set_content,set_subject,set_to,setComeFromDraft,comeFromDraft}) => {
  const {user,setUser}=useContext(Datacontext);
  const [error,setError]=useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addRecipientField = () => {
    setRecipients([...recipients, '']);
  };

  const deleteRecipientField = (indexToRemove) => {
    // Prevent removing the first field
    if (recipients.length > 1) {
      const newRecipients = recipients.filter((_, index) => index !== indexToRemove);
      setRecipients(newRecipients);
      
      // Update the 'to' prop with the first recipient
      set_to(newRecipients[0] || '');
    }
  };

  // Function to update a specific recipient
  const updateRecipient = (index, value) => {
    const newRecipients = [...recipients];
    newRecipients[index] = value;
    setRecipients(newRecipients);
    
    // Update the 'to' prop with the first recipient
    set_to(newRecipients[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const filteredRecipients = recipients.filter(rec => rec.trim() !== '');
    if (filteredRecipients.length === 0 || !subject.trim() || !content.trim()) {
      setError("All fields are required");
      return;
    }
    if (filteredRecipients.some(rec => rec === user.email)) {
      setError("You cannot send a message to yourself");
      return;
    }
    try{
      const res = await axios.get(`http://localhost:8080/api/check/${filteredRecipients}`)
    }catch(error){
      setError(error.response.data.message);
      return;
    }
    setIsLoading(true);
    for (const recipient of filteredRecipients) {
      try {
        const response = await axios.put('http://localhost:8080/api/message', {
          toemail: recipient,
          fromemail: from,
          message: content,
          subject: subject,
          importance: importance === "high" ? 10 : importance === "medium" ? 5 : 0,
          attachments: attachments 
        });
    
        if (response.status === 200) {
          setError(null);
          set_to('');
          set_subject('');
          set_content('');
          setImportance('medium');
          setAttachments([]);
          console.log('successful:', response.data);
          setUser(response.data);
        }
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    handlePageReload(user , setUser);
    setRecipients(['']);
  };

  const options = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <div className="compose-container">
      <h3 className="compose-title">New Message</h3>
      <div className="form-container">
      <div className="recipients-container">
          {recipients.map((recipient, index) => (
            <div key={index} className="recipient-input-container">
              <input
                type="text"
                placeholder="To"
                className="input-field"
                onChange={(e) => {
                  updateRecipient(index, e.target.value);
                  setError(null);
                }}
                value={recipient}
                disabled={isLoading}
              />
              {index === recipients.length - 1 && (
                <button 
                  className="add-recipient-btn"
                  onClick={addRecipientField}
                  type="button"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              )}
              {/* Add delete button for additional recipient fields */}
              {index > 0 && (
                <button
                  className="delete-recipient-btn"
                  onClick={() => deleteRecipientField(index)}
                  type="button"
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Subject"
            className="input-field"
            onChange={(e)=>{set_subject(e.target.value); setError(null)}}
            value={subject}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <div className="importance-container">
            <label className="importance-label">Importance:</label>
            <div className={`importance-selected ${importance}-importance`}>
              Selected: {options.find(opt => opt.value === importance)?.label}
            </div>
          </div>
          
          <div className="importance-options">
            {options.map((option) => (
              <label
                key={option.value}
                className={`importance-option ${
                  importance === option.value ? `selected ${option.value}-importance` : ''
                } ${isLoading ? 'disabled' : ''}`}
              >
                <input
                  type="radio"
                  name="importance"
                  value={option.value}
                  checked={importance === option.value}
                  onChange={(e) => {setImportance(e.target.value); setError(null)}}
                  className="hidden"
                  required
                  disabled={isLoading}
                />
                <div className={`importance-dot ${option.value}-dot ${
                  importance === option.value ? 'selected' : ''
                }`} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>


        <FileAttachment 
          attachments={attachments}
          setAttachments={setAttachments}
          error={error}
          setError={setError}
          disabled={isLoading}
          comeFromDraft={comeFromDraft}
          setComeFromDraft={setComeFromDraft}
        /> 

        

        <div>
          <textarea
            onChange={(e)=>{set_content(e.target.value); setError(null)}}
            placeholder="Write your message here..."
            className="textarea-field focus:outline-blue-500"
            value={content}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="error-message">
            <svg
              className="error-icon"
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

        <div>
          <button 
            className="submit-button"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeForm;