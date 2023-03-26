import React from 'react'
import IPhone from '../Assets/iphone.png'
import Mac from '../Assets/mac.png'
import Ellipse from '../Assets/Ellipse.png'

const Landing = () => {
  return (
    <div className='h-full pt-20'>
      <div className='w-screen h-full'>
        <div className='mt-20 mb-30 text-center text-2xl md:text-4xl text-black font-sora font-bold gap-4'>
          <p>Protect Your Child with just</p>
          <p className='bt-5'>a reistration process</p>
        </div>
        <div className='mt-10 flex mx-auto w-36'>
          <a href='/register' className='py-3 font-bold font-sora border-2 bg-purple-700 border-purple-600 w-36 hover:bg-white hover:text-newblue rounded-md text-white'>REGISTER</a>
        </div>
        <div className='flex flex-col items-center'>
            <img src={Mac} alt='iphone' className='absolute bottom-0 mb-2' />
            <img src={IPhone} alt='iphone' className='absolute bottom-0 ml-48 mt-2' />
          <img src={Ellipse} alt='ellipse' className='absolute bottom-0 -z-10' />
        </div>
      </div>
    </div>
  )
}

export default Landing
