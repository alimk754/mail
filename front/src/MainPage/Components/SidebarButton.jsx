const SidebarButton = ({ icon: Icon, label, active, onClick, variant = "default" }) => {
    const baseStyles = "w-full text-left px-4 py-2 rounded-lg flex items-center gap-2";
    
    const variants = {
      default: active 
        ? "bg-blue-50 text-blue-600" 
        : "text-gray-700 hover:bg-gray-100",
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      danger: "text-red-600 hover:bg-red-50"
    };
  
    return (
      <button 
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]}`}
      >
        <Icon size={20} />
        {label}
      </button>
    );
  };
  export default SidebarButton;