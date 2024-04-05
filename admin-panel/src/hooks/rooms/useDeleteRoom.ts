import { useState } from "react";

export function useDeleteRoom() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deleteRoom = async (id: string) => {
    setError(false);

    const request = await fetch("http://localhost:9999/rooms/delete_room", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    });

    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { deleteRoom, data, error, errorMsg, isLoading };
}