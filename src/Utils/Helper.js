import { isValidPhoneNumber } from 'react-phone-number-input'

const validatePhoneNumber = (value) => {
  let error
  if (value && !isValidPhoneNumber(value)) {
    error = 'Invalid Phone Number'
  }
  return error
}

export { validatePhoneNumber }
