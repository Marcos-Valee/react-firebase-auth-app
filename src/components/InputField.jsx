const InputField = ({
    label,
    value,
    inputType,
    onChange,
    pattern,
    maxLength,
  }) => {
    return (
      <div className="flex flex-col w-full max-w-md mx-auto mb-4">
        <label className="mb-1 font-medium text-gray-700">{label}:</label>
        <div className="relative">
          <input
            className="w-full border-b-2 border-gray-300  focus:outline-none py-2"
            type={inputType}
            value={value}
            onChange={onChange}
            pattern={pattern}
            maxLength={maxLength}
            required
          />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 pointer-events-none" />
        </div>
      </div>
    );
  };
  
  export default InputField;
  