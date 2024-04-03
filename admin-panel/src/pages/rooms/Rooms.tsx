import React, { useEffect, useState } from 'react'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { RoomsTable } from 'components/tables'
import { Link } from 'react-router-dom'
import { useDeleteRoom, useGetRooms } from 'hooks'
import FetchLoadingBadge from 'components/loading/FetchLoadingBadge'
import NoDataAlert from 'components/Alerts/NoDataAlert'
import FailsAlert from 'components/Alerts/FailsAlert'
import SuccessAlert from 'components/Alerts/SuccessAlert'

const Rooms = () => {

  const { GetRooms, data, isLoading } = useGetRooms();

  const fetchRooms = async () => await GetRooms();

  useEffect(() => {
    fetchRooms()
  }, []);

  const { deleteRoom, data: deleteData, error } = useDeleteRoom();

  const deleteRooms = (id: string) => {
    deleteRoom(id);
  }

  const [successAlert, setSuccessAlert] = useState(false)
  const [failsAlert, setFailsAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  useEffect(() => {
    if (error) {
      setFailsAlert(true);
      setAlertMsg("There was an error while deleting the item");
      return
    }

    if (deleteData !== undefined) {
      setSuccessAlert(true);
      setAlertMsg("Item Deleted Successfully");

      fetchRooms()
    }
  }, [deleteData])

  return (
    <div className='p-5 rounded bg-dark_bg'>
      {successAlert && <SuccessAlert setSuccessAlert={setSuccessAlert}>{alertMsg}</SuccessAlert>}
      {failsAlert && <FailsAlert setFailsAlert={setFailsAlert}>{alertMsg}</FailsAlert>}

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
            <RoomsTable rooms={data} deleteRoom={deleteRooms} />
        }
      </div>
    </div>
  )
}

export default Rooms