import axios from "axios";
import { handlePageReload } from "../MainPage/Components/PageReload";
const BASE_URL="http://localhost:8080/api"
export const HandleCategoryDelete=async (title,user,setUser,setError,navigateSection)=>{
    console.log(user);
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

export const HandleDeleteAllDrafts = async (user,setUser,setShowWarining) => {
    try {
      setShowWarining(false);
      const response = await axios.put(`${BASE_URL}/deleteALl`, {
        drafts: user.drafts,
      },{
        auth:{
          username: user.email,
          password: user.password
        }});
      if (response.status === 200) {
        console.log("DeleteAll successful:");
      } else console.error("DeleteAll failed:");
    } catch (error) {
      setError(error.response.data.message);
    }
    handlePageReload(user, setUser);
  };