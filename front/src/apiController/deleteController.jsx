import axios from "axios";
import { handlePageReload } from "../MainPage/Components/PageReload";
    async function bulkdraftDelete(selectedMessages){
        await axios.delete(`http://localhost:8080/api/deleteDrafts/${Array.from(selectedMessages)}`);
    };


    async function bulkDeleteTrash(selectedMessages){
        await axios.delete(`http://localhost:8080/api/delet/${Array.from(selectedMessages)}`);
    };


    async function bulkDeleteSent(selectedMessages,bool,setShowDeleteOp){
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
                    await bulkdraftDelete(selectedMessages);
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


    export const deleteTrashService=async(message,user,setUser)=>{
        try {
            const response = await axios.delete(`http://localhost:8080/api/delete/${message.id}`);
          } catch (error) {
            console.error('delete failed');
          }
          handlePageReload(user, setUser);
    }

    export const deleteCategoryService=async (title,us)=>{
        try {
            const response = await axios.delete(
              `http://localhost:8080/api/folder/delete/${title}/${user.email}`
            );
            console.log(response);
            if (response.status === 200) {
              console.log("Login successful:", response.data);
              setUser((u) => response.data);
              console.log(user);
            } else console.error("Login failed:", response.data.error);
          } catch (error) {
            setError(error.response.data.message);
          }
          handlePageReload(user, setUser);
          navigateSection("compose");
    }
    