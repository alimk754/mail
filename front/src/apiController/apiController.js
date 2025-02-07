import axios from "axios";
import { handlePageReload } from "../MainPage/Components/PageReload";
    async function bulkdraftDelete(selectedMessages){
        await axios.delete(`http://localhost:8080/api/deleteDrafts/${Array.from(selectedMessages)}`);
    };


    async function bulkDeleteTrash(selectedMessages){
        await axios.delete(`http://localhost:8080/api/delet/${Array.from(selectedMessages)}`);
    };


    async function bulkDeleteSentout(selectedMessages,bool,setShowDeleteOp){
        await axios.delete(`http://localhost:8080/api/delete1/${Array.from(selectedMessages)}/${bool}`);
        setShowDeleteOp(false);
    };


    async function bulkDeleteInbox(selectedMessages){
        await axios.delete(`http://localhost:8080/api/delete2/${Array.from(selectedMessages)}`);
    };


    export async function deleteAll(
        selectedMessages,
        title,
        user,
        bool,
        setShowDeleteOp,
        setSelectedMessages,
        setShowBulkDeleteWarning,
        setCurrentMessages,
        setUser
    ) {
        try {
            console.log("Deleting messages:", selectedMessages);
    
            switch (title) {
                case "Trash":
                    await bulkDeleteTrash(selectedMessages);
                    break;
                case "Drafts":
                    await bulkDeleteDrafts(selectedMessages);
                    break;
                case "Sent Mails":
                    await bulkDeleteSent(selectedMessages, bool, setShowDeleteOp);
                    break;
                case "Inbox":
                    await bulkDeleteInbox(selectedMessages);
                    break;
                default:
                    // Custom folder deletion
                    await axios.delete(`${BASE_URL}/folder/folders/${user.email}/${title}/${Array.from(selectedMessages)}`);
                    break;
            }
    
            // Update the state
            setCurrentMessages(prev => prev.filter(message => !selectedMessages.has(message.id)));
            setSelectedMessages(new Set());
            await handlePageReload(user, setUser);
            setShowBulkDeleteWarning(false);
        } catch (error) {
            console.error("Bulk delete failed:", error);
        }
    }