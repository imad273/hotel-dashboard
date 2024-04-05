import { useState } from "react";
import { FetchStaff } from "types";

export function useGetStaff() {
  const [data, setData] = useState<FetchStaff>();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetStaff = async () => {

    const request = await fetch("http://localhost:9999/staff/all_staff", {
      method: "GET"
    });

    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { GetStaff, data, error, errorMsg, isLoading };
}