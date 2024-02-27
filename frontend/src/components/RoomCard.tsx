"use client"

import React, { useState } from 'react'

interface cardProps {
  image: string
  title: string
  price: number
}

const RoomCard = ({ image, title, price }: cardProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div>
      <div className='relative' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className={`cursor-pointer ${hover ? "opacity-90" : "opacity-0"} duration-200 absolute top-0 w-full h-full flex justify-center items-center bg-white/50 backdrop-blur-xl text-white`}>
          <p className='font-semibold text-main'>Started at ${price}</p>
        </div>
        <img src={image} className='w-full h-64' alt="image for the service" />
      </div>
      <p className='text-center font-classic tracking-wider my-2 text-main'>{title}</p>
    </div>
  )
}

export default RoomCard