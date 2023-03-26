import { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import PhoneNumber from '../Components/PhoneNumber'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { validatePhoneNumber } from '../Utils/Helper'
import { PuffLoader } from 'react-spinners'
import { css } from '@emotion/react'

const ScanForm = () => {
  const { cid } = useParams()
  const [location, setLocation] = useState({ latitude: '', longitude: '' })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const LoaderCss = css`
    display: block;
    margin: 0 auto;
    border-color: #3C43FF;
  `

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
    }
  }, []) //eslint-disable-line

  const handleScan = async (body) => {
    setErrorMessage('')
    setSuccessMessage('')
    const name = body.firstName + ' ' + body.lastName
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', body.email)
    formData.append('phone', body.phone)
    formData.append('latitude', location.latitude)
    formData.append('longitude', location.longitude)
    console.log(location)
    setLoading(true)
    await window.fetch(`http://localhost:5000/api/scan/${cid}`, {
      body: formData,
      method: 'POST'
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('Error sending details')
      }
      return res.json()
    }).then(data => {
      if (data.emailSent) {
        setSuccessMessage('Emails sent!')
        setLoading(false)
      }
    }).catch(err => {
      setLoading(false)
      setErrorMessage(err.message)
      console.log(err)
    })
    setLoading(false)
  }

  return (
    <>
      {loading &&
        <div className='bg-blue-100 flex flex-col gap-4 justify-center items-center h-screen w-screen z-30 text-black font-bold font-sora text-4xl'>
          <PuffLoader css={LoaderCss} size={48} loading color='black' />
          Loading...
        </div>
      }
      <div className='w-screen p-5 min-h-screen items-center justify-center'>
        <h1 className='text-2xl md:text-4xl text-start font-bold mb-10 mt-20'>Your details will be sent to the guardians of the child.</h1>
        <h3 className='text-xl md:w-1/3 mx-auto bg-blue-300 rounded-md p-3 text-start font-semibold my-10'>We recommend that you share your location bring the reunion faster</h3>
        <div className='z-10 sm:top-0 mx-auto bg-purple-50 text-black w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5 px-7 pb-7 text-left rounded-xl flex flex-col'>
          <div className='mt-5'>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                phone: '',
                email: ''
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required('Required'),
                lastName: Yup.string().required('Required'),
                phone: Yup.string().required('Required'),
                email: Yup.string().email('Not a valid email').required('Required')
              })}
              onSubmit={(values) => {
                handleScan(values)
              }}
            >
              <Form>
                {errorMessage !== '' &&
                  <div className='text-white text-center p-4 bg-red-400 rounded-md'>{errorMessage}</div>
                }
                {successMessage !== '' &&
                  <div className='text-white text-center p-4 bg-green-400 text-lg font-semibold rounded-md'>{successMessage}</div>
                }
                <div className='grid sm:grid-cols-2 gap-x-6 text-sm'>
                  <div className='mt-2'>
                    <label
                      className='formikLabel mt-2'
                      htmlFor='firstName'
                    >
                      First name
                    </label>
                    <Field
                      name='firstName'
                      className='formikInput px-3 py-2'
                      type='text'
                    />
                    <ErrorMessage name='firstName'>
                      {(msg) => (
                        <div className='text-red-500 w-full text-xs'>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className='mt-2'>
                    <label
                      className='formikLabel mt-2'
                      htmlFor='lastName'
                    >
                      Last name
                    </label>
                    <Field
                      name='lastName'
                      className='formikInput  px-3 py-2'
                      type='text'
                    />
                    <ErrorMessage name='lastName'>
                      {(msg) => (
                        <div className='text-red-500 w-full text-xs'>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-x-6 text-sm'>
                  <div className='sm:col-span-2 mt-2'>
                    <label className='formikLabel text-black mt-2' htmlFor='phone'>
                      Phone Number
                    </label>
                    <Field
                      validate={validatePhoneNumber}
                      name='phone'
                      component={PhoneNumber}
                      placeholder=''
                    />
                    <ErrorMessage name='phone'>
                      {(msg) => (
                        <div className='text-red-500 w-full text-xs'>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className='sm:col-span-2 lg:col-span-3 mt-2'>
                    <label
                      className='formikLabel text-black mt-2'
                      htmlFor='email'
                    >
                      Email
                    </label>
                    <Field
                      name='email'
                      className='formikInput px-3 py-2'
                      type='text'
                    />
                    <ErrorMessage name='email'>
                      {(msg) => (
                        <div className='text-red-500 w-full text-xs'>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className='text-center'>
                  <button
                    type='submit'
                    className='bg-red-500 text-white px-6 py-2 rounded-md mt-7 text-sm'
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScanForm
