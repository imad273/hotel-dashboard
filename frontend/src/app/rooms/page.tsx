import RoomCard from '@/components/RoomCard'
import React from 'react'

const page = () => {

  const rooms = [
    {
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Premier room",
      price: 120
    },
    {
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Premier twin room",
      price: 259
    },
    {
      image: "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Premier deluxe room",
      price: 429
    },
    {
      image: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Premier club pool",
      price: 690
    },
    {
      image: "https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Premier club deluxe pool",
      price: 790
    },
  ]

  return (
    <section className='min-h-screen container'>
      <div className='text-2xl font-semibold text-gray-300 mt-6'>
        <h1>Available rooms</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-5 mt-6">
        {
          rooms.map(room => (
            <div key={room.title}>
              <RoomCard image={room.image} title={room.title} price={room.price} />
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default page