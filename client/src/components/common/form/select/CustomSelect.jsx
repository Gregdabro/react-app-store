import Select from 'react-select'

const SelectField = ({ options, onChange, name, label, defaultValue }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        closeMenuOnSelect={true}
        defaultValue={defaultValue}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
        name={name}
      />
    </div>
  )
}

export default SelectField
