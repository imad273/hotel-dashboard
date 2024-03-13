import React from 'react'
import RoomsTable from 'components/tables/RoomsTable'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { ReservationsTable } from 'components/tables'

const Reservations = () => {
  return (
    <div className='p-5 rounded bg-dark_bg'>
      <div className='flex justify-end'>
        <Button className='gap-2.5'>
          <CopyPlus /> Add Reservation
        </Button>
      </div>

      <div className='py-6'>
        <ReservationsTable />
      </div>
    </div>
  )
}

export default Reservations