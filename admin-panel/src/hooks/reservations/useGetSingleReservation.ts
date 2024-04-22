import { useState } from "react";
import { FetchSingleReservation } from "types";

export function useGetSingleReservation() {
  const [data, setData] = useState<FetchSingleReservation>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetReservation = async (id?: string) => {
    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/reservations/reservation?id=${id}`, {
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