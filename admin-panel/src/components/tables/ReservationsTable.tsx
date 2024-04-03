import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "components/ui/AlertDialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'components/ui/Table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

import { EllipsisVertical, Eye, PencilRuler, Trash2 } from 'lucide-react'
import { Link } from "react-router-dom"
import { FetchReservations } from 'types'

interface TableProps {
  reservations: FetchReservations | undefined
  deleteReservation: (id: string) => void
}

const ReservationTable = ({ reservations, deleteReservation }: TableProps) => {
  const head = [
    "Guest Name",
    "Room Number",
    "Check-in/Check-out",
    "Total Cost",
    "Payment Status",
    "Options",
  ]

  function convertUnixTimeToDate(unixTime: Date) {
    // Create a new Date object using the Unix timestamp
    const date = new Date(unixTime);

    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate;
  }

  return (
    <div className='border border-gray-400 rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            {
              head.map(head => (
                <TableHead key={head} className={`${head === "Amount" && "text-right"}`}>{head}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            reservations?.data.map(data => (
              <TableRow key={data._id}>
                <TableCell>{data.guestName}</TableCell>
                <TableCell>{data.room.number}</TableCell>
                <TableCell>{convertUnixTimeToDate(data.checkIn)} | {convertUnixTimeToDate(data.checkOut)}</TableCell>
                <TableCell>${data.cost}</TableCell>
                <TableCell>
                  {data.paymentStatus === true ?
                    <span className='p-2 font-semibold text-green-500 bg-[#102319] rounded-lg'>Paid</span>
                    :
                    <span className='p-2 font-semibold text-orange-500 bg-[#231a10] rounded-lg'>Pending</span>
                  }
                </TableCell>
                <TableCell>

                  <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none cursor-pointer'>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 border-none !font-mine text-white bg-dark_content_bg">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link to={`/edit_worker/${data._id}`}>
                          <DropdownMenuItem className='gap-2 cursor-pointer hover:bg-dark_content_bg'>
                            <PencilRuler className="w-5 h-5" />
                            <span className='font-semibold'>Edit</span>
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer hover:bg-dark_content_bg'>
                          <AlertDialog>
                            <AlertDialogTrigger className='flex items-center w-full gap-2'>
                              <Trash2 className="w-5 h-5 text-red-600" />
                              <span className='font-semibold'>Delete</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteReservation(data._id)}>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ReservationTable