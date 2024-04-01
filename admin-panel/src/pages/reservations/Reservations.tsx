import React from 'react'
import RoomsTable from 'components/tables/RoomsTable'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { ReservationsTable } from 'components/tables'
import { Link } from 'react-router-dom'

const Reservations = () => {
  return (
    <div className='p-5 rounded bg-dark_bg'>
      <div className='flex justify-end'>
        <Link to="/add_reservation">
          <Button className='gap-2.5'>
            <CopyPlus /> Add Reservation
          </Button>
        </Link>
      </div>

      <div className='py-6'>
        <ReservationsTable />
      </div>
    </div>
  )
}

export default Reservations