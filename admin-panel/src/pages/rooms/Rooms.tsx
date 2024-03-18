import React from 'react'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { RoomsTable } from 'components/tables'
import { Link } from 'react-router-dom'

const Rooms = () => {
  return (
    <div className='p-5 rounded bg-dark_bg'>
      <div className='flex justify-end'>
        <Link to="/add_rooms">
          <Button className='gap-2.5'>
            <CopyPlus /> Add Rooms
          </Button>
        </Link>
      </div>

      <div className='py-6'>
        <RoomsTable />
      </div>
    </div>
  )
}

export default Rooms