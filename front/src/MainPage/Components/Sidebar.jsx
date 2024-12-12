import SidebarButton from "./SidebarButton";
import React from "react";
import { Mail, Trash2, Users, LogOut, Send, Menu, X,MessageCircle } from "lucide-react";

const Sidebar = ({
  isSidebar,
  toggleSidebar,
  activeSection,
  navigateSection,
  onLogout,
}) => {
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
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700"
          >
            {isSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
                label="out Messages"
                active={activeSection === "out Messages"}
                onClick={() => navigateSection("out Messages")}
              />

              <SidebarButton
                icon={Trash2}
                label="Trash"
                active={activeSection === "trash"}
                onClick={() => navigateSection("trash")}
              />
            </nav>

            <div className="absolute bottom-4 w-56">
              <SidebarButton
                icon={LogOut}
                label="Log out"
                onClick={onLogout}
                variant="danger"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
