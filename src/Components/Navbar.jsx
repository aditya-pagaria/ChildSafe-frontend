import React from 'react'
import logo from '../Assets/logo.svg'
import '../Styles/Navbar.css'

const Navbar = () => {
  const isHome = window.location.pathname === '/'
  return (
    <>
      {/* Navbar */}
      <div
        className='fixed z-30 flex justify-between h-16 lg:h-20 w-full transition-all duration-300 ease-in-out border-b-2 shadow-md bg-white'
      >
        <a href='/' className='flex items-center gap-2 h-full ml-5'>
          <img alt='logo' src={logo} className='w-12' />
          <h2 className='text-xl text-blue-700 font-bold font-sora'>ChildSafe</h2>
        </a>
        {/* Navbar desktop */}
        <div className='font-sora transition-all ease-in-out duration-300 top-6 mr-5'>
          {isHome &&
          <div className='flex items-center h-full'>
            <a
              href='/login'
              className='cursor-pointer px-6 py-1 rounded-md text-white border-solid font-bold font-sora border-2 bg-red-500 border-red-500 hover:bg-white hover:text-red-500 hover:border-red-500 transition-all duration-300 ease-in-out'
            >
            Login
          </a>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Navbar
