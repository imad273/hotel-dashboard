import React from 'react'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { RoomsTable } from 'components/tables'

const Rooms = () => {
  return (
    <div className='p-5 rounded bg-dark_bg'>
      <div className='flex justify-end'>
        <Button className='gap-2.5'>
          <CopyPlus /> Add Rooms
        </Button>
      </div>

      <div className='py-6'>
        <RoomsTable />
      </div>
    </div>
  )
}

export default Rooms