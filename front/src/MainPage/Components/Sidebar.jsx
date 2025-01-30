import SidebarButton from "./SidebarButton";
import React,{useContext,useState} from "react";
import { Datacontext } from "../../main";
import {FileEdit, Mail, Trash2, Users, LogOut, Send, Menu, X,MessageCircle,PlusCircle,FolderPlus  } from "lucide-react";
import { handlePageReload } from "./PageReload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  isSidebar,
  toggleSidebar,
  activeSection,
  navigateSection,
}) => {
  const {user,setUser}=useContext(Datacontext);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory,setNewCategory] =useState("");
   const navigate = useNavigate();
  const TrashClick=async ()=>{
    
    try {
      const response = await axios.delete(`http://localhost:8080/api/delete30/${user.email}`);
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
  const handleAddCategory = async () => {
    if(newCategory.trim()){
      console.log('Adding new category:', newCategory);
      try {
      const response = await axios.put('http://localhost:8080/api/folder/add', 
         { email:user.email, name:newCategory }
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
  const onLogout = () => {
    navigate("/", { replace: true, state: { disableUndo: true } });
  };
  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 flex ${
        isSidebar ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4 h-full w-full relative">
        <div className="flex items-center justify-between mb-8">
          <h2
            className={`font-bold text-xl text-gray-800 ${
              !isSidebar && "hidden"
            }`}
          >
            Mail Box
          </h2>
          {isSidebar && (
              <button
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="text-green-500 hover:text-green-600 transition"
              >
                <PlusCircle size={20} />
              </button>
            )}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700"
          >
            {isSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isAddingCategory && isSidebar && (
          <div className="mb-4 flex space-x">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="flex-grow p-2 border rounded"
            />
            <button
              onClick={handleAddCategory}
              className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        )}


        {isSidebar && (
          <div className="space-y-2">
            <SidebarButton
              icon={Send}
              label="Compose"
              onClick={() => navigateSection("compose")}
              variant="primary"
            />

        <nav className="mt-8 space-y-2">
          <SidebarButton
            icon={Mail}
            label="Inbox"
            active={activeSection === "inbox"}
            onClick={() => navigateSection("inbox")}
          />

          <SidebarButton
            icon={Users}
            label="Contacts"
            active={activeSection === "contacts"}
            onClick={() => navigateSection("contacts")}
          />

          <SidebarButton
            icon={MessageCircle}
            label="Sent Mails"
            active={activeSection === "sent Mails"}
            onClick={() => navigateSection("sent Mails")}
          />

          {user.userFolders && user.userFolders.map((e) => (
            <SidebarButton
              icon={FolderPlus}
              key={e.id}
              label={e.name}
              active={activeSection === e.name}
              onClick={() => navigateSection(e.name)}
               
            />
          ))}

          <SidebarButton
            icon={Trash2}
            label="Trash"
            active={activeSection === "trash"}
            onClick={TrashClick}
          
          />

          <SidebarButton
                icon={FileEdit}
                label="Drafts"
                active={activeSection === "drafts"}
                onClick={() => navigateSection("drafts")}
              />
        </nav>
      

      {/* Fixed Logout Button */}
      <div className="absolute bottom-4 w-56">
        <SidebarButton
          icon={LogOut}
          label="Log out"
          onClick={onLogout}
          variant="danger"
          className="w-full"
          
        />
      </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
