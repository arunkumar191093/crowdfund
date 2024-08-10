const InputText = ({
  label = "",
  placeholder = "",
  onChange = () => { },
  type = "text",
  minValue = 0,
  isRequired = false,
  inputClass = "",
  labelClass = "",
  value,
}) => {
  return (
    <div className="my-2">
      {
        !!label &&
        <label className={`font-medium ${labelClass}`}>
          {label}
        </label>
      }
      <input
        type={type}
        required={isRequired}
        value={value}
        min={minValue}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-md block w-full my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm ${inputClass}`}
        placeholder={placeholder}
      />

    </div>
  )
}

export default InputText;