import { useState } from "react";
import { FetchSingleWorker } from "types";

export function useGetSingleWorker() {
  const [data, setData] = useState<FetchSingleWorker>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetWorker = async (id?: string) => {
    let url = "http://localhost:9999";

    if (process.env.NODE_ENV !== "development") {
      url = "https://hotel-app-35mr.onrender.com"
    }

    const request = await fetch(`${url}/staff/worker?id=${id}`, {
      method: "GET"
    });
    
    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { GetWorker, data, error, errorMsg, isLoading };
}