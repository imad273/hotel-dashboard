import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import {
  Home,
  Rooms,
  Reservations,
  AddReservation,
  AddRooms,
  EditRooms,
  Staff,
  AddWorker,
  EditWorker,
  EditReservation
} from '../pages'
import Header from './Header'
import { useState } from 'react'

const Layout = () => {
  const routes = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/rooms",
      element: <Rooms />
    },
    {
      path: "/add_rooms",
      element: <AddRooms />
    },
    {
      path: "/edit_rooms/:id",
      element: <EditRooms />
    },
    {
      path: "/reservations",
      element: <Reservations />
    },
    {
      path: "/add_reservation",
      element: <AddReservation />
    },
    {
      path: "/edit_reservation/:id",
      element: <EditReservation />
    },
    {
      path: "/staff",
      element: <Staff />
    },
    {
      path: "/add_worker",
      element: <AddWorker />
    },
    {
      path: "/edit_worker/:id",
      element: <EditWorker />
    }
  ];

  const [phoneMenu, setPhoneMenu] = useState(false)

  return (
    <main className='flex text-white !font-mine'>
      <div className={`fixed ${phoneMenu ? "w-full" : "w-0"} min-h-screen overflow-hidden bg-dark_bg md:w-72 z-50`}>
        <Sidebar setPhoneMenu={setPhoneMenu} />
      </div>

      <div className="w-full min-h-screen ml-0 overflow-hidden content bg-dark_content_bg md:ml-72">
        <Header setPhoneMenu={setPhoneMenu} />

        <div className='py-5 px-7'>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default Layout