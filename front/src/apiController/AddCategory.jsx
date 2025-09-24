import { handlePageReload } from "../MainPage/Components/PageReload";
import axios from "axios";
const BASE_URL="http://localhost:8080/api";
export const HandleAddCategory = async (newCategory,user,setNewCategory,setIsAddingCategory,setUser) => {
   if (newCategory.trim()) {
  console.log('Adding new category:', newCategory);
  try {
    console.log(user.email);
    console.log(user.password);
    const response = await axios.put(`${BASE_URL}/folder/add`, 
      { 
        email: user.email, 
        name: newCategory 
      }, 
      {
        auth: {
          username: user.email,
          password: user.password
        }
      }
    );
        if (response.status === 200) {
          console.log('Login successful:');
          
        }else 
          console.error('Login failed:');
        
      } catch (error) {
        console.error('Login failed:', error);
      }
      
      setNewCategory('');
      setIsAddingCategory(false);
      handlePageReload(user,setUser);
    }
    
  };