import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import ComposeForm from './Components/ComposeForm';
import ContentSection from './Components/ContentSection';

const MainPage = ({ onLogout }) => {
  const [isSidebar, setSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState('compose');

  const toggleSidebar = () => {
    setSidebar(!isSidebar);
  };

  const navigateSection = (section) => {
    setActiveSection(section);
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
            <ContentSection title="Inbox">
              <div className="text-gray-600">Your messages will appear here</div>
            </ContentSection>
          )}
           {activeSection === 'out Messages' && (
            <ContentSection title="out Messages">
              <div className="text-gray-600">Your out Messages will appear here</div>
            </ContentSection>
          )}
          {activeSection === 'contacts' && (
            <ContentSection title="Contacts">
              <div className="text-gray-600">Your contacts will appear here</div>
            </ContentSection>
          )}
          {activeSection === 'trash' && (
            <ContentSection title="Trash">
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