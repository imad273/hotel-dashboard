import React from 'react'
import { Info } from 'lucide-react'

const NoDataAlert = ({ dataType }: { dataType: string }) => {
  return (
    <div className='bg-dark_content_bg p-3 shadow text-white border border-dark_bg rounded-lg w-full'>
      <div className='w-full flex items-center gap-3'>
        <div className='p-2 rounded-xl bg-[#ED6F00]'>
          <Info size={21} />
        </div>
        <div>
          There is no {`${dataType}`} to display
        </div>
      </div>
    </div>
  )
}

export default NoDataAlert