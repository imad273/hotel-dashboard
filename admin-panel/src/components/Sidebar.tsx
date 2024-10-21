import {
  Album,
  LayoutDashboard,
  School,
  UsersRound,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';

interface Props {
  setPhoneMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ setPhoneMenu }: Props) => {
  const [activeLink, setActiveLink] = useState("dashboard");

  return (
    <div className='relative p-2'>
      <div className='absolute top-10 right-5 md:hidden' onClick={() => setPhoneMenu(false)}>
        <X />
      </div>
      <div className='flex items-center justify-center w-full my-8'>
        {/* <h1 className='text-3xl font-semibold uppercase text-main'>Azure</h1> */}
        <img src={logo} className='w-16' alt="LOGO" />
      </div>

      <div className='mx-2 mt-12 space-y-2'>
        <Link onClick={() => setActiveLink("dashboard")} to="/" className={`${activeLink === "dashboard" && "bg-dark_content_bg"} w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200`}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link onClick={() => setActiveLink("rooms")} to="/rooms" className={`${activeLink === "rooms" && "bg-dark_content_bg"} w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200`}>
          <School size={20} />
          Rooms
        </Link>
        <Link onClick={() => setActiveLink("reservations")} to="/reservations" className={`${activeLink === "reservations" && "bg-dark_content_bg"} w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200`}>
          <Album size={20} />
          Reservations
        </Link>
        <Link onClick={() => setActiveLink("staff")} to="/staff" className={`${activeLink === "staff" && "bg-dark_content_bg"} w-full px-3 py-3.5 rounded-lg flex items-center gap-2 text-gray-300 hover:bg-dark_content_bg hover:text-white duration-200`}>
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