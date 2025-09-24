import React, { useState, useContext } from "react";
import Sidebar from "../MainPage/Components/Sidebar";
import { Datacontext } from "../main";
import WarningModel from "../MainPage/Components/WarningModel";
import axios from "axios";
import { handlePageReload } from "../MainPage/Components/PageReload";
import RenderContent from "./RenderContent";

const MainPage = () => {
  const [isSidebar, setSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState("compose");
  const [PrevSection, setPrevSection] = useState("compose");
  const { user, setUser } = useContext(Datacontext);
  const [showDraftDiv, setShowDraftDiv] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [importance, setImportance] = useState("medium");
  const [to, set_to] = useState("");
  const [from, set_from] = useState(user.email);
  const [content, set_content] = useState("");
  const [subject, set_subject] = useState("");
  const [recipients, setRecipients] = useState([to || ""]);

  const toggleSidebar = () => {
    setSidebar(!isSidebar);
  };

  const navigateSection = (section) => {
    if (
      section !== "compose" &&
      activeSection === "compose" &&
      (to !== "" ||
        content !== "" ||
        subject !== "" ||
        attachments.length !== 0)
    ) {
      setShowDraftDiv(true);
    }
    setPrevSection(activeSection);
    setActiveSection(section);
  };

  const handleClose = () => {
    setShowDraftDiv(false);
    set_to("");
    set_subject("");
    set_content("");
    setImportance("medium");
    setAttachments([]);
    setRecipients([""]);
  };

  const handleClickDraft = async () => {
    try {
      setShowDraftDiv(false);
      const response = await axios.post("http://localhost:8080/api/addDraft", {
        toemail: to,
        namesToCheck: recipients,
        fromemail: from,
        message: content,
        subject: subject,
        importance:
          importance === "high" ? 10 : importance === "medium" ? 5 : 0,
        attachments: attachments,
      },{
      auth:{
        username: user.email,
        password: user.password
      }
    });

      if (response.status === 200) {
        set_to("");
        set_subject("");
        set_content("");
        setImportance("medium");
        setRecipients([""]);
        setAttachments([]);
      } else console.error(" failed:");
    } catch (error) {
      console.error(error);
    }
    handlePageReload(user, setUser);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isSidebar={isSidebar}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        navigateSection={navigateSection}
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
      <RenderContent
        activeSection={activeSection}
        user={user}
        setUser={setUser}
        recipients={recipients}
        setRecipients={setRecipients}
        to={to}
        set_to={set_to}
        from={from}
        set_from={set_from}
        content={content}
        set_content={set_content}
        subject={subject}
        set_subject={set_subject}
        importance={importance}
        setImportance={setImportance}
        attachments={attachments}
        setAttachments={setAttachments}
        navigateSection={navigateSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
};

export default MainPage;
