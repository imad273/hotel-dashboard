import { RoomsProps } from "types";

export interface FetchReservations {
  data: ReservationsProps[]
}
export interface FetchSingleReservation {
  data: ReservationsProps
}

export interface ReservationsProps {
  _id: string,
  room: RoomsProps;
  guestName: string;
  phoneNumber: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  cost: number;
  paymentStatus: boolean;
  note: string;
}