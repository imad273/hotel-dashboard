import React from 'react'
import HomeBars from 'components/charts/HomeBars'
import { Banknote } from 'lucide-react'

const home = () => {
  return (
    <div>
      <h2 className='text-3xl font-semibold text-gray-200'>Overview</h2>
      <p className='mt-2 text-sm text-gray-300'>Tue 8, Feb 2024</p>
      <div className='grid grid-cols-3 gap-3 my-5'>
        <div className='px-3 py-4 bg-main rounded-xl'>
          <div className='flex items-center gap-2'>
            <div className='bg-gray-100 text-main p-1.5 rounded-xl'>
              <Banknote />
            </div>
            <h3 className='text-xl font-semibold text-gray-100'>Profit</h3>
          </div>
          <div className='mt-6'>
            <span className='text-xl font-semibold text-gray-200 float-end'>
              $12.856
            </span>
          </div>
        </div>

        <div className='px-3 py-4 rounded-xl bg-dark_bg'>
          <div className='flex justify-center items-center flex-col h-full gap-1.5'>
            <h3 className='text-5xl font-semibold'>12</h3>
            <p className='text-xs text-gray-200'>Rooms booked (last 30 days)</p>
          </div>
        </div>

        <div className='px-3 py-4 rounded-xl bg-dark_bg'>
          <div className='flex justify-center items-center flex-col h-full gap-1.5'>
            <h3 className='text-5xl font-semibold'>12</h3>
            <p className='text-xs text-gray-200'>Rooms booked (last 30 days)</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 my-5'>
        <div className='p-5 rounded-lg bg-dark_bg'>
          <div>
            <h3 className='pb-6 text-2xl font-semibold text-gray-100'>Revenue</h3>
          </div>
          <HomeBars />
        </div>
        <div className='p-5 rounded-lg bg-dark_bg'>
          jed
        </div>
      </div>
    </div>
  )
}

export default home