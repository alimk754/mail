import React from 'react'
import ContentSection from '../MainPage/Components/ContentSection'
import { handlePageReload } from '../MainPage/Components/PageReload';
import axios from 'axios';

const Draft = ({user,setUser,setActiveSection,set_to,set_from,setRecipients,set_content,set_subject,setAttachments,setImportance,setComeFromDraft}) => {
     const handleDeleteDraft = async (messageID) => {
        try {
          const response = await axios.delete(
            `http://localhost:8080/api/deleteDraft/${messageID}`,{
      auth:{
        username: user.email,
        password: user.password
      }
    }
          );
        } catch (error) {
          console.error(error);
        }
        handlePageReload(user, setUser);
      };
        const handleDoubleCLicking = (message) => {
          try {
            setActiveSection("compose");
            set_to(message.to);
            set_from(message.from);
            setRecipients(message.multiRecipients.split(","));
            set_content(message.message);
            set_subject(message.subject);
            setAttachments(message.attachments);
            setImportance(
              message.importance === 0
                ? "low"
                : message.importance === 5
                ? "medium"
                : "high"
            );
            handleDeleteDraft(message.id);
            setComeFromDraft(true);
          } catch (error) {
            console.error(error);
          }
          handlePageReload(user, setUser);
        };
  return (
    <ContentSection
              handleDeleteDraft={handleDeleteDraft}
              title="Drafts"
              handleDoubleCLicking={handleDoubleCLicking}
              messages={user.drafts === null ? [] : user.drafts}
            >
              <div className="text-gray-600">
                Drafted messages will appear here
              </div>
            </ContentSection>
  )
}

export default Draft