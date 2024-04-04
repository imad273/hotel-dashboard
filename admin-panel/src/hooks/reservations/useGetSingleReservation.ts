import { useState } from "react";
import { FetchSingleReservation } from "types";

export function useGetSingleReservation() {
  const [data, setData] = useState<FetchSingleReservation>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetReservation = async (id?: string) => {

    const request = await fetch(`http://localhost:9999/reservations/reservation`, {
      method: "GET"
    });

    const response = await request.json();

    if (!request.ok && request.status === 500) {
      setError(true);
      setErrorMsg(response)
    }

    setData(response);
    setIsLoading(false);
  }

  return { GetReservation, data, error, errorMsg, isLoading };
}