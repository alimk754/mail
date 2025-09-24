import { handlePageReload } from "../MainPage/Components/PageReload";
import axios from "axios";
const BASE_URL="http://localhost:8080/api"
export const HandleRename=async(user,setERror,setIsVisible,navigateSection,selectedname,title,setUser)=>{
try {
    console.log(user.email,selectedname,title);
    const response = await axios.put(`${BASE_URL}/folder/rename`,{email:user.email,name:selectedname,oldName:title},{
        auth:{
          username: user.email,
          password: user.password
        }});
    setERror(null);
    setIsVisible(false);
    navigateSection(selectedname);
    handlePageReload(user,setUser);
  } catch (error) {
    setERror(error.response.data.message);
    
  }
}