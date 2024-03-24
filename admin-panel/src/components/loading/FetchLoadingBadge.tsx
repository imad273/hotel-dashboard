import React from 'react'
import { LoaderCircle } from 'lucide-react'

const FetchLoadingBadge = () => {
  return (
    <div className='rounded w-full h-52 bg-dark_content_bg flex justify-center items-center'>
      <LoaderCircle className="animate-spin" size={42} />
    </div>
  )
}

export default FetchLoadingBadge