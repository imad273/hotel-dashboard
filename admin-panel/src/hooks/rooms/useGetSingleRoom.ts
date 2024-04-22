import { useState } from "react";
import { FetchSingleRoom } from "types";

export function useGetSingleRoom() {
  const [data, setData] = useState<FetchSingleRoom>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetRoom = async (id?: string) => {
    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/rooms/room?id=${id}`, {
      method: "GET"
    });
    
    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { GetRoom, data, error, errorMsg, isLoading };
}