import React, { useState,useContext } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import ComposeForm from './Components/ComposeForm';
import ContentSection from './Components/ContentSection';
import { Datacontext } from '../main';
const MainPage = () => {
  const [isSidebar, setSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState('compose');
  const navigate = useNavigate();
  const {user,setUser} =useContext(Datacontext);
  const toggleSidebar = () => {
    setSidebar(!isSidebar);
  };

  const navigateSection = (section) => {
    setActiveSection(section);
  };

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

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-4rem)]">
          {activeSection === 'inbox' && (
            <ContentSection title="Inbox" messages={user.in===null? []:user.in}>
              <div className="text-gray-600">Your messages will appear here</div>
            </ContentSection>
          )}
           {activeSection === 'out Messages' && (
            <ContentSection title="out Messages" messages={user.out===null? []:user.out}>
              <div className="text-gray-600">Your out Messages will appear here</div>
            </ContentSection>
          )}
          {activeSection === 'contacts' && (
            <ContentSection title="Contacts" messages={[]}>
              <div className="text-gray-600">Your contacts will appear here</div>
            </ContentSection>
          )}
          {activeSection === 'trash' && (
            <ContentSection title="Trash" messages={user.trash===null? []:user.trash}>
              <div className="text-gray-600">Deleted messages will appear here</div>
            </ContentSection>
          )}
          {activeSection === 'compose' && <ComposeForm />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;