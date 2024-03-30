import { useState } from "react";

interface dataType {
  name: string
  position: string
  phoneNumber: string
  email: string
  address: string
}

export function useEditWorker() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let formData = new FormData();

  const editWorker = async (data: dataType, id: string) => {
    setError(false);
    setIsLoading(true);

    const request = await fetch("http://localhost:9999/staff/edit_worker", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
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

  return { editWorker, data, error, errorMsg, isLoading };
}