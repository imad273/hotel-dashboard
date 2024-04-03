import React, { useEffect, useState } from 'react'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDeleteWorker, useGetStaff } from 'hooks'
import FetchLoadingBadge from 'components/loading/FetchLoadingBadge'
import NoDataAlert from 'components/Alerts/NoDataAlert'
import StaffTable from 'components/tables/StaffTable'
import FailsAlert from 'components/Alerts/FailsAlert'
import SuccessAlert from 'components/Alerts/SuccessAlert'

const Staff = () => {

  const { GetStaff, data, isLoading } = useGetStaff();

  const fetchRooms = async () => await GetStaff();

  useEffect(() => {
    fetchRooms()
  }, []);

  const { deleteWorker, data: deleteData, error } = useDeleteWorker();

  const deleteStaffs = (id: string) => {
    deleteWorker(id);
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
            <StaffTable staff={data} deleteStaff={deleteStaffs} />
        }
      </div>
    </div>
  )
}

export default Staff