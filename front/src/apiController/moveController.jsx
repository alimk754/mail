import axios from "axios";
import { handlePageReload } from "../MainPage/Components/PageReload";
const BASE_URL="http://localhost:8080/api"
export const MoveController = async (selectedMessages,user,categoryName,setCurrentMessages,setErrorOcurred,setShowMoveOptions,setSelectedMessages,setCategoryName) => {
    try{
      console.log(selectedMessages);
      console.log(user.email);
      console.log(categoryName);
      const response = await axios.put(`${BASE_URL}/folder/${user.email}/${Array.from(selectedMessages)}/${categoryName}`);
    
      setCurrentMessages(prev => 
        prev.filter(message => !selectedMessages.has(message.id))
      );
    
    }catch(error){
      setErrorOcurred(error.response.data.message);
      return;
    }
    setShowMoveOptions(false);
    setSelectedMessages(new Set());
    setCategoryName('');
    handlePageReload(user, setUser);
  };
  export const retrieveService=async (message,user,onMessageUpdate,setUser)=>{

        try {
          let checkUser = (message.from === user.email);
          let bool = true;
          if (message.from === user.email) bool = false;
          const response = await axios.get(`${BASE_URL}/retrieve/${message.id}/${bool}/${checkUser}`);
          console.log('Full response:', response);
          console.log('Response data:', response.data);
          onMessageUpdate(message.id)
        } catch (error) {
          console.error('Retrieve failed:', error.response ? error.response.data : error.message);
        }
        handlePageReload(user, setUser);
      };
    

