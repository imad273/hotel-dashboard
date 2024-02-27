import React from 'react'
import Image from "next/image";
import { Button } from './ui/button';

interface cardProps {
  image: any
  title: string
  description: string
}

const ServiceCard = ({ image, title, description }: cardProps) => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1'>
        <Image src={image} className='w-full h-56' alt="overview for the service" />
        <h3 className='text-main text-center mb-2 mt-4 font-classic tracking-wide'>{title}</h3>
        <p className='text-sm text-center'>{description}</p>
      </div>
      <div className='mt-5 text-sm flex justify-center items-center'>
        <Button variant="outline" className='rounded-none px-6 py-4'>view</Button>
      </div>
    </div>
  )
}

export default ServiceCard