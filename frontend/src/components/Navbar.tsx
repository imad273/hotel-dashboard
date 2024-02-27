

import React from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'

const Navbar = () => {

  return (
    <nav className='container bg-dark_content_bg shadow flex items-center justify-between py-4'>
      <div>
        <h3 className='font-bold text-main'>
          THE HOTEL
        </h3>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <span className='hover:text-main duration-300'>
            <Link href="/">
              Home
            </Link>
          </span>
          <Link href="/book">
            <span className='hover:text-main duration-300'>
              Book
            </span>
          </Link>
          <Link href="/">
            <span className='hover:text-main duration-300'>
              About
            </span>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

export default Navbar