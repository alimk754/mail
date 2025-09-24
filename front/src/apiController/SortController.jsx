import axios from "axios";
const BASE_URL="http://localhost:8080/api"
export const Sort=async(user,isAscending,selectedSort,setIsVisible)=>{try {
        const response = await axios.post(`${BASE_URL}/api/sort`,{id:user.email,isAsc:isAscending,sortField:selectedSort},{
        auth:{
          username: user.email,
          password: user.password
        }});
        console.log(response);
        console.log(' successful:', response.data);
        setUser(u=>response.data);
        console.log(user);
    
      } catch (error) {
        
      }
    setIsVisible(false);
}