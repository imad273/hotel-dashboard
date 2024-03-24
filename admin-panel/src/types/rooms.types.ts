export interface FetchRooms {
  data: RoomsProps[]
}

export interface RoomsProps {
  _id: string,
  number: string,
  price: number,
  capacity: number,
  description: string,
  availability: boolean,
  images: string[]
}