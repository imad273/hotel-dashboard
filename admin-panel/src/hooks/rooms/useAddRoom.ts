import { useState } from "react";

interface dataType {
  number: string
  price: number,
  capacity: number,
  description: string,
  images: File[]
}

export function useAddRoom() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let formData = new FormData();

  const createRoom = async (data: dataType) => {
    setIsLoading(true);

    formData.append("number", data.number);
    data.images.map(image => {
      formData.append("images", image);
    })
    formData.append("price", data.price.toString());
    formData.append("capacity", data.capacity.toString());
    formData.append("description", data.description);

    const request = await fetch("http://localhost:9999/rooms/create_room", {
      method: "POST",
      body: formData
    });

    const response = await request.json();

    if (!request.ok && request.status === 500) {
      setError(true);
      setErrorMsg(response)
    }

    setData(response);
    setIsLoading(false);
  }

  return { createRoom, data, error, errorMsg, isLoading };
}