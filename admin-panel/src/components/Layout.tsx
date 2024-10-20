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
  ]

  return (
    <main className='flex text-white !font-mine'>
      <div className='fixed w-0 min-h-screen overflow-hidden bg-dark_bg md:w-72'>
        <Sidebar />
      </div>

      <div className="w-full min-h-screen ml-0 overflow-hidden content bg-dark_content_bg md:ml-72">
        <Header />

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