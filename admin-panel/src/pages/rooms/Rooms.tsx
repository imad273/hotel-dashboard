import React, { useEffect } from 'react'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { RoomsTable } from 'components/tables'
import { Link } from 'react-router-dom'
import { useGetRooms } from 'hooks'
import FetchLoadingBadge from 'components/loading/FetchLoadingBadge'
import NoDataAlert from 'components/Alerts/NoDataAlert'

const Rooms = () => {

  const { GetRooms, data, error, isLoading } = useGetRooms();

  const fetchRooms = async () => await GetRooms();

  useEffect(() => {
    fetchRooms()
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data])

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
        {isLoading ?
          <FetchLoadingBadge />
          :
          data?.data.length === 0 ?
            <NoDataAlert dataType="Rooms" />
            :
            <RoomsTable rooms={data} />
        }
      </div>
    </div>
  )
}

export default Rooms