import React, { useState,useContext } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import ComposeForm from './Components/Compose/ComposeForm';
import ContentSection from './Components/ContentSection';
import { Datacontext } from '../main';
import Contact from './Components/Contacts/Contact';

import WarningModel from './Components/WarinigModel';
import axios from 'axios';
import { handlePageReload } from './Components/PageReload';
const MainPage = () => {
  const [isSidebar, setSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState('compose');
  const [PrevSection, setPrevSection] = useState('compose');
  const navigate = useNavigate();
  const {user,setUser} =useContext(Datacontext);
  const[showDraftDiv , setShowDraftDiv] = useState(false);

  const [attachments, setAttachments] = useState([]);
  const [importance, setImportance] = useState('medium');
  const [to,set_to]=useState("");
  const [from,set_from]=useState(user.email);
  const [content,set_content]=useState("");
  const [subject,set_subject]=useState("");


  const handleDoubleCLicking = (message) => {
    try{
      setActiveSection('compose');
      set_to(message.to);
      set_from(message.from);
      set_content(message.message);
      set_subject(message.subject);
      setAttachments(message.attachments);
      console.log(message.importance);
      setImportance((message.importance === 0) ? "low" : ((message.importance === 5) ? "medium" : "high"));
      console.log(message)

      handleDeleteDraft(message.id);
    }catch(error){
      console.error(error);
    }
    handlePageReload(user,setUser);
  }

  const handleDeleteDraft = async (messageID) => {
    try{
      const response = await axios.delete(`http://localhost:8080/api/deleteDraft/${messageID}`);
    }catch(error){
      console.error(error);
    }
    handlePageReload(user,setUser)
  }

  const toggleSidebar = () => {
    setSidebar(!isSidebar);
  };

  const navigateSection = (section) => {
    if (section !== 'compose' && activeSection === 'compose' && (to !== "" || content !== "" || subject !== "" || attachments.length !== 0)) {
      console.log(subject);
      console.log(content);
      console.log(to);
      console.log(attachments.length);
      setShowDraftDiv(true);
    }
    setPrevSection(activeSection);
    setActiveSection(section);
  };
  

  const handleClose = () => {
    setShowDraftDiv(false);
    set_to('');
    set_subject('');
    set_content('');
    setImportance('medium');
    setAttachments([]);
  }

  const handleClickDraft = async () => {
    try{
      setShowDraftDiv(false);
      console.log(subject);
      console.log(content);
      console.log(attachments);
      console.log(to);
      console.log(from);
      console.log(importance);
      const response = await axios.post('http://localhost:8080/api/addDraft', {
        toemail: to,
        fromemail: from,
        message: content,
        subject: subject,
        importance: importance === "high" ? 10 : importance === "medium" ? 5 : 0,
        attachments: attachments
      });
      
      if (response.status === 200) {
        console.log('successful:');
        set_to('');
        set_subject('');
        set_content('');
        setImportance('medium');
        setAttachments([]);
      }else 
        console.error(' failed:');
    }catch(error){
      console.error(error);
    }
    handlePageReload(user, setUser);
  }
  const onLogout = () => {
    navigate('/', { replace: true, state: { disableUndo: true } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isSidebar={isSidebar}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        navigateSection={navigateSection}
        onLogout={onLogout}
      />

      <WarningModel
         isOpen={showDraftDiv}
         onClose={handleClose}
         onConfirm={handleClickDraft}
         title="Warning"
         message={`DO you want to draft this message?`}
         confirmText="Yes, Draft"
         cancelText="Cancel" 
      />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-4rem)]">
          {activeSection === 'inbox' && (
            <ContentSection title="Inbox" messages={user.in===null? []:user.in}>
              <div className="text-gray-600">Your messages will appear here</div>
            </ContentSection>
          )}
          {activeSection === 'sent Mails' && (
            <ContentSection title="Sent Mails" messages={user.out===null? []:user.out}>
              <div className="text-gray-600">Your out Messages will appear here</div>
            </ContentSection>
          )}



          
          {activeSection === 'contacts' && (
            <>
            <ContentSection title="Contacts" messages={[]}>
              <div className="text-gray-600">
               
              </div>
            </ContentSection>
            <Contact /></>
          )}

{user.userFolders && user.userFolders.map((folder) => (
  activeSection === folder.name && (
    <ContentSection 
      key={folder.id}
      title={folder.name} 
      messages={folder.messages || []}
      navigateSection={navigateSection}
    >
      <div className="text-gray-600"></div>
    </ContentSection>
  )
))}






          {activeSection === 'trash' && (
            <ContentSection title="Trash" messages={user.trash===null? []:user.trash}>
              <div className="text-gray-600">Deleted messages will appear here</div>
            </ContentSection>
          )}
           {activeSection === 'drafts' && (
            <ContentSection handleDeleteDraft={handleDeleteDraft} title="Drafts" handleDoubleCLicking={handleDoubleCLicking} messages={user.drafts===null? []:user.drafts}>
              <div className="text-gray-600">Drafted messages will appear here</div>
            </ContentSection>
          )}
          {activeSection === 'compose' && <ComposeForm 
          to={to} set_to={set_to} from={from} set_from={set_from} content={content} set_content={set_content} subject={subject}
          set_subject={set_subject} importance={importance} setImportance={setImportance} attachments={attachments} 
          setAttachments={setAttachments}/>}
        </div>
      </div>
    </div>
  );
};

export default MainPage;