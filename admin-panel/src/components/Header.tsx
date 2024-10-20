import { Bell, UserRound } from 'lucide-react'

const Header = () => {
  return (
    <div className='w-full p-4 border-l header bg-dark_bg border-stone-800'>
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