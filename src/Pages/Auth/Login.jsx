import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'
import { css } from '@emotion/react'
import loginSVG from '../../Assets/login.svg'
import { useAuth } from '../../Contexts/AuthContext'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [visible, setVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [buttonText, setButtonText] = useState('LOGIN')
  const [buttonDisable, setButtonDisable] = useState(true)
  const history = useHistory()
  const LoaderCss = css`
    display: block;
    margin: 0 auto;
    border-color: #3C43FF;
  `
  const { login } = useAuth()

  const handleChange = (event) => {
    setErrorMessage('')
    const cred = credentials
    cred[event.target.name] = event.target.value
    setCredentials(cred)
    if (cred.email !== '' && cred.password !== '') {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }

  const handleEnter = (event) => {
    if (event.target.name === 'password' && event.key === 'Enter') {
      handleLogin()
    }
  }

  const handleLogin = () => {
    if (credentials.email !== '' && credentials.password !== '') {
      setButtonDisable(true)
      setButtonText(<PuffLoader css={LoaderCss} size={24} loading color='white' />)
      login(credentials.email, credentials.password).then((loggedIn) => {
        if (loggedIn) {
          setButtonDisable(false)
          setButtonText('LOGIN')
          history.push('/home')
        } else {
          setButtonText('LOGIN')
          setButtonDisable(false)
        }
      })
    } else {
      setErrorMessage('Enter Credentials')
    }
  }

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <div className='h-screen pt-16'>
      <div className='w-screen relative'>
        <div className='ml-28 w-2/5 max-w-xl pt-24'>
          <div>
            <h1 className='font-sora font-bold text-3xl text-left'>LOGIN</h1>
            <p className='font-sora font-normal mt-3 text-lg text-left'>Do not have an account? <a className='underline' href='/register'>Sign up</a></p>
          </div>
          <div className='mt-5 flex flex-col items-start'>
            <p className={`mt-5 text-md font-medium font-sora ${errorMessage.length > 0 ? 'p-3' : ''} text-white text-center bg-red-400 rounded-md`}>{errorMessage}</p>
            <input
              type='text'
              name='email'
              className='mt-5 p-3 border-2 bg-purple-100 rounded-md outline-none w-full'
              placeholder='Email'
              onChange={handleChange}
              autoComplete='off'
            />
            <input
              type={visible ? 'text' : 'password'}
              name='password'
              className='mt-5 p-3 border-2 bg-purple-100 rounded-md outline-none w-full'
              placeholder='Password'
              onKeyPress={handleEnter}
              onChange={handleChange}
            />
            <div>
              <input
                type='checkbox'
                className='mt-5 mr-1 outline-none rounded'
                id='showPassword'
                name='showPassword'
                onClick={handleClick}
              />
              <label className='showPassword' htmlFor='showPassword'>Show Password</label>
            </div>
            <button
              type='submit'
              onClick={handleLogin}
              disabled={buttonDisable}
              className='w-full p-4 bg-purple-600 font-sora font-bold rounded-md text-white mt-5 mb-8 outline-none cursor-pointer border-2 border-purple-600 hover:bg-purple-700 hover:text-white hover:border-purple-700 disabled:bg-purple-800 disabled:text-gray-400 disabled:border-purple-800 disabled:cursor-default'
            >
              {buttonText}
            </button>
          </div>
        </div>
        <img src={loginSVG} alt='login' className='absolute top-1/4 w-2/5 right-10' />
      </div>
    </div>
  )
}

export default Login
