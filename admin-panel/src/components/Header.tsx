import { Bell, Menu, UserRound } from 'lucide-react'

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full py-4 border-l md:block px-7 md:px-4 header bg-dark_bg border-stone-800'>
      <div className='md:hidden'>
        <Menu />
      </div>
      <div className='flex items-center justify-end gap-4'>
        <div className='cursor-pointer'>
          <Bell size={22} className='text-gray-200 duration-200 hover:text-main' />
        </div>
        <div className='cursor-pointer'>
          <UserRound size={22} className='text-gray-200 duration-200 hover:text-main' />
        </div>
      </div>
    </div>
  )
}

export default Header