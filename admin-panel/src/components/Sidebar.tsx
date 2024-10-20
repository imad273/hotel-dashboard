import {
  Album,
  LayoutDashboard,
  School,
  UsersRound
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = () => {
  return (
    <div className='p-2'>
      <div className='flex items-center justify-center w-full my-8'>
        {/* <h1 className='text-3xl font-semibold uppercase text-main'>Azure</h1> */}
        <img src={logo} className='w-16' alt="LOGO" />
      </div>

      <div className='mx-2 mt-12 space-y-2'>
        <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link to="/rooms" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <School size={20} />
          Rooms
        </Link>
        <Link to="/reservations" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <Album size={20} />
          Reservations
        </Link>
        <Link to="/staff" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <UsersRound size={20} />
          Staff
        </Link>
        {/* <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <BarChartHorizontalBig size={20} />
          Analytics
        </Link>
        <Link to="/" className='w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200'>
          <Settings size={20} />
          Settings
        </Link> */}
      </div>
    </div>
  )
}

export default Sidebar