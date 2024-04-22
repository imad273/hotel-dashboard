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

export function useEditReservation() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editReservation = async (data: dataType, id: string) => {
    setError(false);

    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/reservations/edit_reservation`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        id: id,
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

  return { editReservation, data, error, errorMsg, isLoading };
}