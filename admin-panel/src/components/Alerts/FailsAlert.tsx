import React from 'react'
import { X } from 'lucide-react'

interface typo {
  setFailsAlert: React.Dispatch<React.SetStateAction<boolean>>,
  children: React.ReactNode
}

const FailsAlert = ({ setFailsAlert, children }: typo) => {

  setTimeout(() => {
    setFailsAlert(false)
  }, 3000)

  return (
    <div className='fixed w-3/6 bottom-5 left-5'>
      <div className='bg-dark_content_bg p-3 shadow text-white border border-dark_bg rounded-lg w-full'>
        <div className='w-full flex justify-between items-center'>
          <div className="flex gap-3 items-center">
            <div className='p-2 rounded-xl bg-[#FF5631]'>
              <X size={21} />
            </div>
            <div>
              {children}
            </div>
          </div>
          <div>
            <X onClick={() => setFailsAlert(false)} size={20} className='text-gray-300 cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FailsAlert