import { useState } from "react";
import { FetchSingleRoom } from "types";

export function useGetSingleRoom() {
  const [data, setData] = useState<FetchSingleRoom>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetRoom = async (id?: string) => {

    const request = await fetch(`http://localhost:9999/rooms/room?id=${id}`, {
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

  return { GetRoom, data, error, errorMsg, isLoading };
}