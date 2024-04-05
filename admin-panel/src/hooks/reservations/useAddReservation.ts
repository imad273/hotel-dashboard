import { useState } from "react";

interface dataType {
  room: string;
  guestName: string;
  phoneNumber: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  cost: number;
  paymentStatus: boolean;
  note: string;
}

export function useAddReservation() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createReservation = async (data: dataType) => {
    setError(false);
    
    const request = await fetch("http://localhost:9999/reservations/create_reservation", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        checkIn: data.checkIn.getTime(),
        checkOut: data.checkOut.getTime(),
      })
    });

    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { createReservation, data, error, errorMsg, isLoading };
}