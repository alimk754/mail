 import { handlePageReload } from "../MainPage/Components/PageReload";

 export const handleSearchChange = (e,setSearchTerm,searchBy,setFilteredMessages) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!searchBy) return;

    const currentMessages = getMessageList();
    if (value.trim() === "") {
      setFilteredMessages(currentMessages);
    } else {
      const searchValue = value;
      const searchResults = currentMessages.filter((message) => {

        switch (searchBy) {
          case "subject":
            return message.subject?.includes(searchValue);
          case "sender":
            return message.from?.includes(searchValue);
          case "receiver":
            return message.to?.includes(searchValue);
          case "content":
            return message.message?.includes(searchValue);
          case "time":
            return message.createdAt?.includes(searchValue);
          case "attachment":
            if (!Array.isArray(message.attachments)) return false;
            return message.attachments.some((attachment) =>
              attachment?.fileName?.includes(searchValue)
            );

          case "importance":
            let imp;
            if (message.importance === 0) imp = "low";
            else if (message.importance === 10) imp = "high";
            else imp = "medium";
            return imp?.includes(searchValue);
          default:
            return false;
        }
      });
      setFilteredMessages(searchResults);
    }
  };

 export const getMessageList = (title,user,messages) => {
    switch (title) {
      case "Inbox":
        return user.in || [];
      case "Sent Mails":
        return user.out || [];
      case "Trash":
        return user.trash || [];
      case "Drafts":
        return user.drafts || [];

      default:
        return messages || [];
    }
  };