function ActionButton({ name, color, hover, onClick }) {
    return (
      <button
        className={`text-white ${color} hover:${hover} rounded p-1 text-2xl 
          w-10 h-10 flex justify-center items-center cursor-pointer`}
        onClick={onClick}
      >
        {name}
      </button>
    );
  }
  
  export default ActionButton;
  