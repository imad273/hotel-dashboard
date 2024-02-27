import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
import home from "../assets/home.jpg";
import pool from "../assets/pool.jpg";
import club from "../assets/club.jpg";
import lunch from "../assets/lunch.jpg";
import RoomCard from "@/components/RoomCard";
import Image from "next/image";

export default function Home() {
  // For the services cards in section 2
  const services = [
    {
      image: pool,
      title: "Infinity Pool",
      description: "An 89m heated infinity pool with breathtaking views over the valley."
    },
    {
      image: club,
      title: "Club Lounge",
      description: "A sophisticated and quiet space reserved for VIP and Club guests only."
    },
    {
      image: lunch,
      title: "Free Lunch Food",
      description: "A sustainable haven for intimate events and wedding ceremonies, embraced by nature's beauty and warmth."
    },
  ]

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
    <main>
      <section className="container h-[90vh]">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center flex-col gap-6">
            <div className="text-4xl font-semibold text-center w-4/6">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4E6A] via-[#E88306] to-[#FFAF00]">Unwind in Luxury:</h1>
              <h1 className="text-gray-200">Discover Our Exquisite Hotel and Resort</h1>
            </div>

            <Button className="gap-2">
              Book
              <ArrowRight size={20} />
            </Button>
          </div>
          <div>
            <Image src={home} alt="home" className="h-[500px] w-80 rounded"/>
          </div>
        </div>
      </section>

      <section className="min-h-screen py-2">
        <h3 className="text-main text-xl uppercase text-center mt-3 font-classic tracking-wide">Royal experience</h3>
        <div className="flex justify-center items-center my-6">
          <h1 className="text-2xl font-semibold text-center w-4/6">
            Designed by the most creative minds,
            build by the finest people in the industry,
            and we have finally begun our journey to serve you.
          </h1>
        </div>

        <div className="container grid grid-cols-3 gap-6 mb-5 mt-10">
          {
            services.map(service => (
              <div key={service.title}>
                <ServiceCard image={service.image} title={service.title} description={service.description} />
              </div>
            ))
          }
        </div>
      </section>

      <section className="min-h-screen py-2 bg-dark_content_bg">
        <h3 className="text-main text-xl uppercase text-center mt-3 font-classic tracking-wide">Rooms & suits</h3>
        <div className="flex justify-center items-center my-6">
          <h1 className="text-2xl font-semibold text-center w-4/6">
            Each suite is meticulously designed to offer the
            perfect blend of comfort, elegance, and sophistication
          </h1>
        </div>

        <div className="container grid grid-cols-3 gap-6 mb-5 mt-10">
          {
            rooms.map(room => (
              <div key={room.title}>
                <RoomCard image={room.image} title={room.title} price={room.price} />
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
}
