const ContentSection = ({ title, children }) => {
    return (
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
        {children}
      </div>
    );
  };
  export default ContentSection;