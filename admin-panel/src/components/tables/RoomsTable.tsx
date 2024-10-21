import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'components/ui/Table'

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

import { EllipsisVertical, Eye, PencilRuler, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FetchRooms } from 'types'

interface TableProps {
  rooms: FetchRooms | undefined
  deleteRoom: (id: string) => void
}

const RoomsTable = ({ rooms, deleteRoom }: TableProps) => {
  const head = [
    "Room Number",
    "Capacity", // 2 person
    "Availability",
    "Options",
  ]

  return (
    <div className='border border-[#2a2c31] rounded-md'>
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
                    <DropdownMenuTrigger className='outline-none cursor-pointer'>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 border-none !font-mine text-white bg-dark_content_bg">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link to={`/edit_rooms/${data._id}`}>
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
                                <AlertDialogAction onClick={() => deleteRoom(data._id)}>Continue</AlertDialogAction>
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
    </div >
  )
}

export default RoomsTable