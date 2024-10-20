import React, { useState } from 'react'
import HomeBars from 'components/charts/HomeBars'
import { Banknote } from 'lucide-react'
import HomeTable from 'components/tables/HomeTable'
import HomeLine from 'components/charts/LineChart'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);

  return (
    <section>
      <div className='items-center justify-between mb-2 md:flex'>
        <h2 className='text-3xl font-semibold text-gray-200'>Overview</h2>
        <p className='mt-2 text-sm font-medium text-gray-200 md:mt-0 md:font-semibold'>{formattedDate}</p>
      </div>

      <div className='grid gap-3 my-5 md:grid-cols-3'>
        <div className='px-3 py-4 bg-main rounded-xl'>
          <div className='flex items-center gap-2'>
            <div className='bg-gray-100 text-main p-1.5 rounded-xl'>
              <Banknote />
            </div>
            <h3 className='text-xl font-semibold text-gray-100'>Revenue</h3>
          </div>
          <div className='mt-6'>
            <span className='text-2xl font-semibold text-gray-200 float-end'>
              $12.856
            </span>
          </div>
        </div>

        <div className='relative px-3 py-4 rounded-xl bg-dark_bg'>
          <div className='flex justify-center items-center flex-col h-full gap-1.5'>
            <h3 className='text-5xl font-semibold'>12</h3>
            <p className='text-xs text-gray-200'>Rooms booked (last 30 days)</p>
          </div>
          <div className='absolute flex items-center text-sm font-semibold text-green-500 top-2 right-4'>
            <FaCaretUp size={16}/> %23
          </div>
        </div>

        <div className='relative px-3 py-4 rounded-xl bg-dark_bg'>
          <div className='flex justify-center items-center flex-col h-full gap-1.5'>
            <h3 className='text-5xl font-semibold'>65</h3>
            <p className='text-xs text-gray-200'>Visitor (last 30 days)</p>
          </div>
          <div className='absolute flex items-center text-sm font-semibold text-red-500 top-2 right-4'>
            <FaCaretDown size={16}/> %15
          </div>
        </div>
      </div>

      <div className='grid gap-3 my-5 md:grid-cols-2'>
        <div className='p-5 rounded-lg bg-dark_bg'>
          <div>
            <h3 className='pb-6 text-2xl font-semibold text-gray-100'>Revenue</h3>
          </div>
          <HomeBars />
        </div>
        <div className='p-5 rounded-lg bg-dark_bg'>
          <div>
            <h3 className='pb-6 text-2xl font-semibold text-gray-100'>Visitors</h3>
          </div>
          <HomeLine />
        </div>
      </div>

      <div className='w-full p-5 rounded-lg bg-dark_bg'>
        <div>
          <h3 className='pb-6 text-2xl font-semibold text-gray-100'>Last reservations</h3>
        </div>
        <HomeTable />
      </div>
    </section>
  )
}

export default Home