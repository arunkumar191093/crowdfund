const InputText = ({
  label = "",
  placeholder = "",
  onChange = () => { },
  type = "text",
  isRequired = false,
  value,
}) => {
  return (
    <div className="my-4">
      <label className="font-medium">
        {label}
      </label>
      <input
        type={type}
        required={isRequired}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md block w-full my-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
        placeholder={placeholder}
      />

    </div>
  )
}

export default InputText;