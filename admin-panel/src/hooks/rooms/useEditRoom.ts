import { useState } from "react";

interface dataType {
  availability: boolean
  number: string
  price: number,
  capacity: number,
  description: string,
  images: File[]
}

export function useEditRoom() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let formData = new FormData();

  const editRoom = async (data: dataType, id: string) => {
    setError(false);

    formData.append("id", id.toString());
    formData.append("availability", data.availability.toString());
    formData.append("number", data.number);
    data.images.map(image => {
      formData.append("images", image);
    })
    formData.append("price", data.price.toString());
    formData.append("capacity", data.capacity.toString());
    formData.append("description", data.description);

    const request = await fetch("http://localhost:9999/rooms/edit_room", {
      method: "POST",
      /* headers: { 'Content-Type': 'multipart/form-data ' }, */
      body: formData
    });

    if (!request.ok && request.status === 500) {
      setError(true);
    }

    const response = await request.json();

    setData(response);
    setIsLoading(false);
  }

  return { editRoom, data, error, errorMsg, isLoading };
}