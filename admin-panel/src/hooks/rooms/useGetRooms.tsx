import { useState } from "react";
import { FetchRooms } from "types";

export function useGetRooms() {
  const [data, setData] = useState<FetchRooms>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetRooms = async () => {

    const request = await fetch("http://localhost:9999/all_rooms", {
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

  return { GetRooms, data, error, errorMsg, isLoading };
}