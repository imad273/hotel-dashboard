import React from 'react'
import {
  Album,
  BarChartHorizontalBig,
  LayoutDashboard,
  School,
  Settings,
  UsersRound
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='p-2'>
      <div className='w-full flex justify-center items-center my-8'>
        <h1 className='font-semibold text-3xl text-main'>LOGO</h1>
      </div>

      <div className='mt-12 mx-2 space-y-2'>
        <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/rooms" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <School size={20} />
          Rooms
        </Link>
        <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <Album size={20} />
          Reservations
        </Link>
        <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <UsersRound size={20} />
          Staff
        </Link>
        <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <BarChartHorizontalBig size={20} />
          Analytics
        </Link>
        <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <Settings size={20} />
          Settings
        </Link>
      </div>
    </div>
  )
}

export default Sidebar