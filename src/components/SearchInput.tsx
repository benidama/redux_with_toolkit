const SearchInputs = ({ placeholder, Icon }: { placeholder: string; Icon: React.ComponentType<{ size: number; className: string }> }) => {
  return (
    <div className="relative flex items-center">
      <Icon size={20} className="absolute flex left-2 text-gray-400" />
      <input
        type="text"
        className="bg-white rounded-md p-2 md:p-4 w-80 md:w-60 outline-none text-sm pl-7 md:pl-8"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInputs;
