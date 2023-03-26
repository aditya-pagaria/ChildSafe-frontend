import PhoneInput from 'react-phone-number-input'
import '../Styles/SelectField.css'

const PhoneNumber = ({ field, form, placeholder, disabled }) => (
  <PhoneInput
    className='formikInput pl-3'
    name={field.name}
    placeholder={placeholder}
    value={field.value}
    countrySelectProps={{
      className: 'bg-purple-300'
    }}
    disabled={disabled}
    defaultCountry='IN'
    onChange={(value) => form.setFieldValue(field.name, value)}
    onBlur={field.onBlur} // eslint-disable-line
  />
)

export default PhoneNumber
