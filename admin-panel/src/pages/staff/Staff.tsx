import React, { useEffect } from 'react'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { RoomsTable } from 'components/tables'
import { Link } from 'react-router-dom'
import { useDeleteRoom, useGetStaff } from 'hooks'
import FetchLoadingBadge from 'components/loading/FetchLoadingBadge'
import NoDataAlert from 'components/Alerts/NoDataAlert'

const Staff = () => {

  const { GetStaff, data, isLoading } = useGetStaff();

  const fetchRooms = async () => await GetStaff();

  useEffect(() => {
    fetchRooms()
  }, []);

  const { deleteRoom, data: deleteData, isLoading: deleteLoading } = useDeleteRoom();

  const deleteRooms = (id: string) => {
    deleteRoom(id);
  }

  useEffect(() => {
    if (deleteData !== undefined) {
      fetchRooms()
    }
  }, [deleteData])

  return (
    <div className='p-5 rounded bg-dark_bg'>
      <div className='flex justify-end'>
        <Link to="/add_worker">
          <Button className='gap-2.5'>
            <CopyPlus /> Add Worker
          </Button>
        </Link>
      </div>

      <div className='py-6'>
        {isLoading ?
          <FetchLoadingBadge />
          :
          data?.data.length === 0 ?
            <NoDataAlert dataType="Staff" />
            :
            <RoomsTable rooms={data} deleteRoom={deleteRooms} />
        }
      </div>
    </div>
  )
}

export default Staff