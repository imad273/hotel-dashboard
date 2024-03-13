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

const ReservationTable = () => {
  const head = [
    "ID",
    "Guest Name",
    "Room Number",
    "Check-in/Check-out",
    "Number of Guests",
    "Total Cost",
    "Payment Status",
    "Options",
  ]

  const data = [
    {
      ID: "D158sX",
      guestName: "Ahmed",
      roomNumber: 0o1,
      checkIn_checkOut: "05/01/2024 | 08/01/2024",
      numberOfGuests: 1,
      totalCost: 120,
      paymentStatus: "payed",
    },
    {
      ID: "M398sX",
      guestName: "Hicham",
      roomNumber: 0o2,
      checkIn_checkOut: "10/02/2024 | 18/02/2024",
      numberOfGuests: 2,
      totalCost: 220,
      paymentStatus: "pending",
    },
    {
      ID: "X169aX",
      guestName: "Muhammed",
      roomNumber: 0o6,
      checkIn_checkOut: "11/01/2024 | 18/02/2024",
      numberOfGuests: 2,
      totalCost: 320,
      paymentStatus: "payed",
    },
    {
      ID: "S185aP",
      guestName: "Hala",
      roomNumber: 0o5,
      checkIn_checkOut: "13/01/2024 | 16/02/2024",
      numberOfGuests: 3,
      totalCost: 290,
      paymentStatus: "pending",
    },
  ]

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
            data.map(data => (
              <TableRow key={data.ID}>
                <TableCell>{data.ID}</TableCell>
                <TableCell>{data.guestName}</TableCell>
                <TableCell>{data.roomNumber}</TableCell>
                <TableCell>{data.checkIn_checkOut}</TableCell>
                <TableCell>{data.numberOfGuests}</TableCell>
                <TableCell>{data.totalCost}</TableCell>
                <TableCell>
                  {data.paymentStatus === "payed" ?
                    <span className='p-2 font-semibold text-green-500 bg-[#102319] rounded-lg'>{data.paymentStatus}</span>
                    :
                    <span className='p-2 font-semibold text-orange-500 bg-[#231a10] rounded-lg'>{data.paymentStatus}</span>
                  }
                </TableCell>
                <TableCell>

                  <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer outline-none'>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 border-none !font-mine text-white bg-dark_content_bg">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer gap-2 hover:bg-dark_content_bg'>
                          <PencilRuler className="h-5 w-5" />
                          <span className='font-semibold'>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer gap-2 hover:bg-dark_content_bg'>
                          <Eye className="h-5 w-5" />
                          <span className='font-semibold'>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer gap-2 hover:bg-dark_content_bg'>
                          <Trash2 className="h-5 w-5 text-red-600" />
                          <span className='font-semibold'>Delete</span>
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