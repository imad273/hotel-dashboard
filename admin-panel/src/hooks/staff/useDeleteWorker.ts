import { useState } from "react";

export function useDeleteWorker() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deleteWorker = async (id: string) => {
    setError(false);

    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/staff/delete_worker`, {
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

  return { deleteWorker, data, error, errorMsg, isLoading };
}