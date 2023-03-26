import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import PhoneNumber from '../Components/PhoneNumber'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import '../Styles/SelectField.css'
import { validatePhoneNumber } from '../Utils/Helper'
import Child from '../Assets/Child.png'
import Adult from '../Assets/Adult.png'
import registerBG from '../Assets/registerBG.svg'

const RegisterGuardian = () => {
  const history = useHistory()
  const backend_url = process.env.REACT_APP_BACKEND
  const access = window.localStorage.getItem('accessToken')
  if (access === null || access === undefined) {
    history.push('login')
  } else {
    console.log(access)
  }

  const handlePoc = (body) => {
    window.fetch(`${backend_url}/poc`, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: access
      }
    }).then((res) => {
      if (res.status === 200) {
        history.push('/qr')
      } else {
        history.push('/login')
      }
      return res.json()
    }).then(data => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='w-screen pb-5 pt-20 md:pt-24 min-h-screen font-sora'>
      <img src={Adult} alt='Adult' className='absolute h-3/4 bottom-0 left-10' />
      <img src={Child} alt='Child' className='absolute bottom-0 right-10' />
      <img src={registerBG} alt='Child' className='absolute -z-10 w-1/3 top-48 left-1/3' />
      <h1 className='text-4xl text-start font-bold my-10'>Register all your close ones on ChildSafe!</h1>
      <div className='flex items-center justify-center h-full'>  
        <div className='z-10 sm:top-0 bg-purple-50 text-black w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5 px-7 pb-7 text-left rounded-xl flex flex-col'>
          <div className='mt-5'>
            <Formik
              initialValues={{
                users: [{
                  firstName: '',
                  lastName: '',
                  phone: '',
                  email: ''
                }]
              }}
              validationSchema={Yup.object({
                users: Yup.array((Yup.object({
                  firstName: Yup.string().required('Required'),
                  lastName: Yup.string().required('Required'),
                  phone: Yup.string().required('Required'),
                  email: Yup.string().email('Not a valid email').required('Required')
                }))).min(1).max(3)
              })}
              onSubmit={(values) => {
                const users = values.users.map(user => {
                  return ({
                    name: user.firstName + ' ' + user.lastName,
                    email: user.email,
                    phone: user.phone
                  })
                })
                const body = {
                  guardians: users
                }
                handlePoc(body)
              }}
            >
              {({ values }) => (
                <Form>
                  <div className='h-full md:h-3/4'>
                    <FieldArray name='users'>
                      {({ push, remove }) => (
                        <div className=' divide-y-2 divide-gray-100 overflow-auto '>
                          {values.users.map((_, index) => (
                            <div className='py-5' key={index}>
                              <div className='grid sm:grid-cols-2 gap-x-6 text-sm'>
                                <div className='mt-2'>
                                  <label
                                    className='formikLabel text-black mt-2'
                                    htmlFor={`users[${index}].firstName`}
                                  >
                                    First name
                                  </label>
                                  <Field
                                    name={`users[${index}].firstName`}
                                    className='formikInput px-3 py-2'
                                    type='text'
                                  />
                                  <ErrorMessage name={`users[${index}].firstName`}>
                                    {(msg) => (
                                      <div className='text-red-500 w-full text-xs'>{msg}</div>
                                    )}
                                  </ErrorMessage>
                                </div>
                                <div className='mt-2'>
                                  <label
                                    className='formikLabel text-black mt-2'
                                    htmlFor={`users[${index}].lastName`}
                                  >
                                    Last name
                                  </label>
                                  <Field
                                    name={`users[${index}].lastName`}
                                    className='formikInput px-3 py-2'
                                    type='text'
                                  />
                                  <ErrorMessage name={`users[${index}].lastName`}>
                                    {(msg) => (
                                      <div className='text-red-500 w-full text-xs'>{msg}</div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                              <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-x-6 text-sm'>
                                <div className='sm:col-span-2 mt-2'>
                                  <label className='formikLabel text-black mt-2' htmlFor={`users[${index}].phone`}>
                                    Phone Number
                                  </label>
                                  <Field
                                    validate={validatePhoneNumber}
                                    name={`users[${index}].phone`}
                                    component={PhoneNumber}
                                    placeholder=''
                                  />
                                  <ErrorMessage name={`users[${index}].phone`}>
                                    {(msg) => (
                                      <div className='text-red-500 w-full text-xs'>{msg}</div>
                                    )}
                                  </ErrorMessage>
                                </div>
                                <div className='sm:col-span-2 lg:col-span-3 mt-2'>
                                  <label
                                    className='formikLabel text-black mt-2'
                                    htmlFor={`users[${index}].email`}
                                  >
                                    Email
                                  </label>
                                  <Field
                                    name={`users[${index}].email`}
                                    className='formikInput px-3 py-2'
                                    type='text'
                                  />
                                  <ErrorMessage name={`users[${index}].email`}>
                                    {(msg) => (
                                      <div className='text-red-500 w-full text-xs'>{msg}</div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                              <div className='w-full mt-7 flex justify-center'>
                                <button
                                  type='button'
                                  onClick={() => remove(index)}
                                  className={`w-48 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md ${values.users.length < 2 ? 'hidden' : ''}`}
                                >
                                  Remove User
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className='w-2/3 flex gap-5 mx-auto'>
                            <button
                              onClick={() => push({ firstName: '', lastName: '', phone: '', gender: '', age: '' })}
                              className='mx-auto w-28 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md mt-7'
                            >
                              Add User
                            </button>
                            <button
                              onClick={() => history.push('/qr')}
                              className='mx-auto w-28 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md mt-7'
                            >
                              Skip
                            </button>
                            <button
                              type='submit'
                              className='mx-auto w-28 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md mt-7'
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterGuardian
