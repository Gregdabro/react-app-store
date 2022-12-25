import Select from 'react-select'

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options

  const handleChange = (value) => {
    onChange({ name: name, value })
  }
  return (
    <>
      <div>
        <label>{label}</label>
        <Select
          isMulti
          closeMenuOnSelect={false}
          defaultValue={defaultValue}
          options={optionsArray}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          name={name}
        />
      </div>
    </>
  )
}

export default MultiSelectField
