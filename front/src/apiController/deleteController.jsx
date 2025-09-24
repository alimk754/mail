import axios from "axios";
import { handlePageReload } from "../MainPage/Components/PageReload";
const BASE_URL="http://localhost:8080/api"
    async function bulkdraftDelete(selectedMessages){
        await axios.delete(`${BASE_URL}/deleteDrafts/${Array.from(selectedMessages)}`,{
        auth:{
          username: user.email,
          password: user.password
        }});
    };


    async function bulkDeleteTrash(selectedMessages,user){
        await axios.delete(`${BASE_URL}/delet/${Array.from(selectedMessages)}/${user.email}`,{
        auth:{
          username: user.email,
          password: user.password
        }});
    };


    async function bulkDeleteSent(selectedMessages,bool,setShowDeleteOp){
        await axios.delete(`${BASE_URL}/delete1/${Array.from(selectedMessages)}/${bool}`,{
        auth:{
          username: user.email,
          password: user.password
        }});
        setShowDeleteOp(false);
    };


    async function bulkDeleteInbox(selectedMessages){
        await axios.delete(`${BASE_URL}/delete2/${Array.from(selectedMessages)}`,{
        auth:{
          username: user.email,
          password: user.password
        }});
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
                    await bulkDeleteTrash(selectedMessages,user,{
        auth:{
          username: user.email,
          password: user.password
        }});
                    break;
                case "Drafts":
                    await bulkdraftDelete(selectedMessages,{
        auth:{
          username: user.email,
          password: user.password
        }});
                    break;
                case "Sent Mails":
                    await bulkDeleteSent(selectedMessages, bool, setShowDeleteOp,{
        auth:{
          username: user.email,
          password: user.password
        }});
                    break;
                case "Inbox":
                    await bulkDeleteInbox(selectedMessages,{
        auth:{
          username: user.email,
          password: user.password
        }});
                    break;
                default:
                    // Custom folder deletion
                    await axios.delete(`${BASE_URL}/folder/folders/${user.email}/${title}/${Array.from(selectedMessages)}`,{
        auth:{
          username: user.email,
          password: user.password
        }});
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
            const response = await axios.delete(`${BASE_URL}/delete/${message.id}`,{
        auth:{
          username: user.email,
          password: user.password
        }});
          } catch (error) {
            console.error('delete failed');
          }
          handlePageReload(user, setUser);
    }

    export const deleteCategoryService=async (title,us)=>{
        try {
            const response = await axios.delete(
              `${BASE_URL}/folder/delete/${title}/${user.email}`,{
        auth:{
          username: user.email,
          password: user.password
        }}
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
    export const handleDeleteAll=async(user,setUser,setShowWarining)=>{
        try {
            setShowWarining(false);
            const response = await axios.put(
              "${BASE_URL}/deleteALl",
      
              { trash: user.trash },{
        auth:{
          username: user.email,
          password: user.password
        }}
            );
            if (response.status === 200) {
              console.log("DeleteAll successful:");
            } else console.error("DeleteAll failed:");
          } catch (error) {
            setError(error.response.data.message);
          }
          handlePageReload(user, setUser);
    }