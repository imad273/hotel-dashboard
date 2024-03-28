import { useState } from "react";

export function useDeleteRoom() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deleteRoom = async (id: string) => {

    const request = await fetch("http://localhost:9999/rooms/delete_room", {
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

  return { deleteRoom, data, error, errorMsg, isLoading };
}