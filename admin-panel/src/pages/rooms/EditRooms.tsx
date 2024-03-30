import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/Input"
import { Textarea } from "../../components/ui/textarea"
import CustomFileInput from 'components/ui/customFileInput'
import { Trash2 } from 'lucide-react'
import SuccessAlert from 'components/Alerts/SuccessAlert'
import FailsAlert from 'components/Alerts/FailsAlert'
import LoadingBadge from 'components/loading/LoadingBadge'
import { useEditRoom, useGetSingleRoom } from 'hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Switch } from 'components/ui/Switch'
import { Label } from 'components/ui/label'

const formSchema = z.object({
  availability: z.boolean(),
  number: z.string().min(2, {
    message: "Room Number is required",
  }),
  price: z.number().gte(1, {
    message: "Price is required",
  }),
  capacity: z.number().gte(1, {
    message: "Capacity is required",
  }),
  description: z.string().min(2, {
    message: "Room Description is required",
  }),
  images: z.instanceof(File).array(),
})

const EditRooms = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: true,
      number: "",
      price: 0,
      capacity: 0,
      description: "",
      images: [],
    },
  })

  const [viewImages, setViewImages] = useState<{ url: string, name: string }[]>([]);

  const imageInput = (value: any) => {
    const images = form.getValues('images')
    form.setValue('images', [...images, value[0]])

    // Add image viewImages to view it later
    const preview = URL.createObjectURL(value[0]);
    setViewImages([...viewImages, {
      url: preview,
      name: value[0].name
    }]);
  }

  const deletePic = (name: string) => {
    const images = form.getValues('images')

    const newImages = images.filter((image: any) => image.name !== name)
    form.setValue('images', newImages)

    // Remove image from viewImages
    const newPrevImages = viewImages.filter((image: any) => image.name !== name)
    setViewImages(newPrevImages);
  }

  const { GetRoom, data, isLoading } = useGetSingleRoom();
  const { editRoom, data: uploadData, error, isLoading: editLoading } = useEditRoom();

  const params = useParams();

  useEffect(() => {
    GetRoom(params.id)
  }, [params]);

  useEffect(() => {
    if (data !== undefined) {
      form.setValue('availability', data.data.availability)
      form.setValue('number', data.data.number)
      form.setValue('price', data.data.price)
      form.setValue('capacity', data.data.capacity)
      form.setValue('description', data.data.description)
    }
  }, [data]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    params.id !== undefined && editRoom(values, params.id)
  }

  const [successAlert, setSuccessAlert] = useState(false)
  const [failsAlert, setFailsAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setFailsAlert(true);
      setAlertMsg("There was an error while updating the room");
      return
    }

    if (uploadData !== undefined) {
      setSuccessAlert(true);
      setAlertMsg("Room Updated Successfully");

      setTimeout(() => {
        navigate('/rooms')
      }, 2000)
    }
  }, [uploadData, error]);

  return (
    <div className='p-5 rounded bg-dark_bg relative'>
      {successAlert && <SuccessAlert setSuccessAlert={setSuccessAlert}>{alertMsg}</SuccessAlert>}
      {failsAlert && <FailsAlert setFailsAlert={setFailsAlert}>{alertMsg}</FailsAlert>}

      {isLoading || editLoading && <LoadingBadge />}

      <div className='mb-6'>
        <h3 className='text-2xl font-semibold'>Edit Room</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem className='flex items-center gap-3'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label className='!m-0'>Availability</Label>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input placeholder="0F01" {...field} />
                </FormControl>
                {/*                 
                  <FormDescription>
                    This is your public display name.
                  </FormDescription> 
                */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type='number' {...field} min={0}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input type='number' {...field} min={0}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Type your description here." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Images</FormLabel>
            <CustomFileInput inputFunction={imageInput} />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {viewImages.length > 0 ?
              <div className='flex flex-wrap items-center gap-5 py-5'>
                {viewImages.map((image) => (
                  <div key={image.url} className='relative'>
                    <img className='w-24 h-24 bg-cover rounded' src={image.url} alt="Selected Image" />
                    <div onClick={() => deletePic(image.name)} className='absolute cursor-pointer p-1.5 bg-red-500 rounded-full -top-3 -right-3'>
                      <Trash2 size={16} className='text-white' />
                    </div>
                  </div>
                ))}
              </div>
              :
              <div>
                <h3 className='font-semibold'>Current photos of this room</h3>
                <div className='flex flex-wrap items-center gap-5 py-5'>
                  {data?.data.images.map((image, index) => (
                    <div key={index}>
                      <img className='w-24 h-24 bg-cover rounded' src={`http://localhost:9999/uploads/${image}`} alt="Selected Image" />
                    </div>
                  ))}
                </div>
              </div>
            }
          </div>

          <div className="flex flex-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditRooms