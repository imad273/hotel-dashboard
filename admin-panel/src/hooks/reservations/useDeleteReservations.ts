import { useState } from "react";

export function useDeleteReservations() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deleteReservations = async (id: string) => {
    setError(false);
    setIsLoading(true);
    
    const request = await fetch("http://localhost:9999/reservations/delete_reservation", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    });

    const response = await request.json();

    if (!request.ok && request.status === 500) {
      setError(true);
      setErrorMsg(response)
    }

    setData(response);
    setIsLoading(false);
  }

  return { deleteReservations, data, error, errorMsg, isLoading };
}