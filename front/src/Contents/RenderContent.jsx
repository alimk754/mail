import React,{useState} from 'react'
import ContentSection from '../MainPage/Components/ContentSection'
import Contact from '../Contacts/Contact'
import Draft from './Draft'
import ComposeForm from '../Compose/ComposeForm'

const RenderContent = ({
    activeSection,
    user,
    setUser,
    recipients,
    setRecipients,
    to,
    set_to,
    from,
    set_from,
    content,
    set_content,
    subject,
    set_subject,
    importance,
    setImportance,
    attachments,
    setAttachments,
    navigateSection,
    setActiveSection
  }) => {
    const [comeFromDraft, setComeFromDraft] = useState(false);
  return (
    <div className="flex-1 p-8">
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-4rem)]">
      {activeSection === "inbox" && (
        <ContentSection title="Inbox"messages={user.in === null ? [] : user.in}>
          <div className="text-gray-600"> </div>
        </ContentSection>
      )}
      {activeSection === "sent Mails" && (
        <ContentSection title="Sent Mails" messages={user.out === null ? [] : user.out}>
          <div className="text-gray-600"> </div>
        </ContentSection>
      )}

      {activeSection === "contacts" && (
        <>
          <ContentSection title="Contacts" messages={[]}>
            <div className="text-gray-600"></div>
          </ContentSection>
          <Contact />
        </>
      )}

      {user.userFolders &&
        user.userFolders.map(
          (folder) =>
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
        )}

      {activeSection === "trash" && (
        <ContentSection title="Trash"  messages={user.trash === null ? [] : user.trash}   >
          <div className="text-gray-600"></div>
        </ContentSection>
      )}
      {activeSection === "drafts" && (
        <Draft  user={user}  setUser={setUser} setActiveSection={setActiveSection}set_to={set_to} set_from={set_from}  setRecipients={setRecipients}set_content={set_content}  set_subject={set_subject}setAttachments={setAttachments}setImportance={setImportance}setComeFromDraft={setComeFromDraft} />
      )}
      {activeSection === "compose" && (
      <ComposeForm  recipients={recipients}setRecipients={setRecipients}to={to}set_to={set_to}  from={from}set_from={set_from}content={content} set_content={set_content} subject={subject}set_subject={set_subject}     importance={importance} setImportance={setImportance} attachments={attachments}  setAttachments={setAttachments}  setComeFromDraft={setComeFromDraft}comeFromDraft={comeFromDraft}/>
      )}
    </div>
  </div>
  )
}

export default RenderContent