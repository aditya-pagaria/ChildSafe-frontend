import Select from 'react-select'
const addSelectStyle = (provided) => ({
  ...provided,
  backgroundColor: '#383B98',
  color: 'white',
  borderRadius: '10px',
  border: 'none'
})

const SelectField = ({ options, field, form, placeholder, disabled }) => (
  <Select
    options={options}
    name={field.name}
    placeholder={placeholder}
    styles={{
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? '#3B7DED'
          : state.isFocused
            ? '#4244B4'
            : '#383B98',
        color: 'white',
        borderRadius: '4px'
      }),
      menu: addSelectStyle,
      placeholder: addSelectStyle,
      control: addSelectStyle,
      singleValue: addSelectStyle,
      dropdownIndicator: addSelectStyle,
      input: addSelectStyle
    }}
    isDisabled={disabled}
    value={
      options ? options.find((option) => option.value === field.value) : ''
    }
    onChange={(option) => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur} // eslint-disable-line
  />
)

export default SelectField
