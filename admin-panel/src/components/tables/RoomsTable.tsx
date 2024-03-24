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
import { FetchRooms } from 'types'

interface TableProps {
  rooms: FetchRooms | undefined
}

const RoomsTable = ({ rooms }: TableProps) => {
  const head = [
    "Room Number",
    "Capacity", // 2 person
    "Availability",
    "Options",
  ]

  /* const data = [
    {
      number: "001",
      type: "Double",
      capacity: 2,
      availability: true,
    },
    {
      number: "002",
      type: "Single",
      capacity: 1,
      availability: false,
    },
    {
      number: "003",
      type: "Double",
      capacity: 2,
      availability: true,
    },
    {
      number: "004",
      type: "Double",
      capacity: 3,
      availability: false,
    },
  ] */

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
            rooms?.data.map((data) => (
              <TableRow key={data._id}>
                <TableCell>{data.number}</TableCell>
                {/* <TableCell>{data.type}</TableCell> */}
                <TableCell>{data.capacity}</TableCell>
                <TableCell>
                  {data.availability === true ?
                    <span className='p-2 font-semibold text-green-500 bg-[#102319] rounded-lg'>available</span>
                    :
                    <span className='p-2 font-semibold text-red-500 bg-[#231210] rounded-lg'>unavailable</span>
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
                          <span className='font-semibold'>View</span>
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

export default RoomsTable