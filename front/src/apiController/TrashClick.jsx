import axios from "axios";
import { handlePageReload } from "../MainPage/Components/PageReload";
const BASE_URL="http://localhost:8080/api"
export const TrashClick=async(user,setUser,navigateSection)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/delete30/${user.email}`);
          if (response.status === 200) {
            console.log('Login successful:');
            
          }else 
            console.error('Login failed:');
          
        } catch (error) {
          console.error('Login failed:', error);
        }
  
        handlePageReload(user,setUser);
        navigateSection("trash");
}