import React, { useContext } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const backend_url = process.env.REACT_APP_BACKEND
  const signup = async (email, password, name, phone) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('name', name)
    formData.append('phone', phone)
    let registered = false
    try {
      await window.fetch(`${backend_url}/signup`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res.status !== 200) {
          throw new Error('Error signing up')
        }
        registered = true
      })
      return registered
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const login = async (email, password) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    try {
      let loggedIn = false
      await window.fetch(`${backend_url}/login`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('Error logging in')
        }
      }).then(data => {
        window.localStorage.setItem('accessToken', data.access)
        window.localStorage.setItem('refreshToken', data.refresh)
        loggedIn = true
      })
      if (loggedIn) {
        return true
      }
      return false
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const logout = () => {
    try {
      auth.signOut()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  // const resetPassword = (email) => {
  //   return auth.sendPasswordResetEmail(email)
  // }

  // const updateEmail = (email) => {
  //   return currentUserId.updateEmail(email)
  // }

  // const updatePassword = (password) => {
  //   return currentUserId.updatePassword(password)
  // }

  const value = {
    login,
    signup,
    logout
    // resetPassword,
    // updateEmail,
    // updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
