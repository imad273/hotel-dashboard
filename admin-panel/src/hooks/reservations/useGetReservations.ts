import { useState } from "react";
import { FetchReservations } from "types";

export function useGetReservations() {
  const [data, setData] = useState<FetchReservations>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetReservations = async () => {
    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/reservations/all_reservations`, {
      method: "GET"
    });

    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { GetReservations, data, error, errorMsg, isLoading };
}