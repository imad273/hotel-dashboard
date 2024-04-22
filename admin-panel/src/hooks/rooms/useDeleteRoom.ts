import { useState } from "react";

export function useDeleteRoom() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deleteRoom = async (id: string) => {
    setError(false);
    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/rooms/delete_room`, {
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