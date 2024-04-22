import { useState } from "react";
import { FetchRooms } from "types";

export function useGetRooms() {
  const [data, setData] = useState<FetchRooms>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetRooms = async () => {
    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/rooms/all_rooms`, {
      method: "GET"
    });

    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { GetRooms, data, error, errorMsg, isLoading };
}