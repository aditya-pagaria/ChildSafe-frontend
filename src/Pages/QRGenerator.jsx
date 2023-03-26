import React from 'react'
import QRCode from 'qrcode.react'
import { useAuth } from '../Contexts/AuthContext'
import shirt from '../Assets/shirt.svg'

const QRGenerator = () => {
  const { currentClientId } = useAuth()
  const url = `https://child-traqr.netlify.app/scan/${currentClientId}`
  return (
    <div className='h-screen w-screen p-10'>
      <div className='flex items-center justify-evenly h-full w-full'>
        <div className='flex flex-col items-start gap-6 font-sora'>
          <img src={shirt} alt="shirt" className='w-96' />
          <p className='text-2xl'>Your Unique QR Code</p>
          <p>This QR code will be embedded in your clothes</p>
          <div className='flex gap-4'>
            <button className='bg-newblue hover:bg-newdarkblue px-8 py-3 text-lg text-white rounded-md'>Shop now</button>
          </div>
        </div>
        <QRCode
          value={url}
          size={380}
          id='qr-gen'
          level='H'
        />
      </div>
    </div>
  )
}

export default QRGenerator
