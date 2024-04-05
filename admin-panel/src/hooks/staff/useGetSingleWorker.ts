import { useState } from "react";
import { FetchSingleWorker } from "types";

export function useGetSingleWorker() {
  const [data, setData] = useState<FetchSingleWorker>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetWorker = async (id?: string) => {

    const request = await fetch(`http://localhost:9999/staff/worker?id=${id}`, {
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