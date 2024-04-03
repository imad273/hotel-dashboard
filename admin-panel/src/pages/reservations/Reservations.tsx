import React, { useEffect, useState } from 'react'
import { Button } from 'components/ui/button'
import { CopyPlus } from 'lucide-react'
import { ReservationsTable } from 'components/tables'
import { Link } from 'react-router-dom'
import { useGetReservations } from 'hooks'
import FetchLoadingBadge from 'components/loading/FetchLoadingBadge'
import NoDataAlert from 'components/Alerts/NoDataAlert'
import FailsAlert from 'components/Alerts/FailsAlert'
import SuccessAlert from 'components/Alerts/SuccessAlert'

const Reservations = () => {

  const { GetReservations, data, isLoading } = useGetReservations();

  const fetchReservations = async () => await GetReservations();

  useEffect(() => {
    fetchReservations()
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  //const { deleteWorker, data: deleteData, error } = useDeleteWorker();

  const deleteReservations = (id: string) => {
    //deleteWorker(id);
  }

  const [successAlert, setSuccessAlert] = useState(false)
  const [failsAlert, setFailsAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  /*   useEffect(() => {
      if (error) {
        setFailsAlert(true);
        setAlertMsg("There was an error while deleting the item");
        return
      }
  
      if (deleteData !== undefined) {
        setSuccessAlert(true);
        setAlertMsg("Item Created Successfully");
  
        fetchRooms()
      }
    }, [deleteData]) */

  return (
    <div className='p-5 rounded bg-dark_bg'>
      {successAlert && <SuccessAlert setSuccessAlert={setSuccessAlert}>{alertMsg}</SuccessAlert>}
      {failsAlert && <FailsAlert setFailsAlert={setFailsAlert}>{alertMsg}</FailsAlert>}

      <div className='flex justify-end'>
        <Link to="/add_reservation">
          <Button className='gap-2.5'>
            <CopyPlus /> Add Reservation
          </Button>
        </Link>
      </div>

      <div className='py-6'>
        {isLoading ?
          <FetchLoadingBadge />
          :
          data?.data.length === 0 ?
            <NoDataAlert dataType="Reservations" />
            :
            <ReservationsTable reservations={data} deleteReservation={deleteReservations} />
        }
      </div>
    </div>
  )
}

export default Reservations