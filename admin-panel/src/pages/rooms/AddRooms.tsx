"use client"

import React, { useState } from 'react'
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

const formSchema = z.object({
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
  images: z.object({
    file: z.any()
  }).array().min(1, {
    message: "At least 1 image is required",
  }),
})

const AddRooms = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      price: 0,
      capacity: 0,
      description: "",
      images: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

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

  return (
    <div className='p-5 rounded bg-dark_bg'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input type='number' {...field}
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
                  <Input type='number' {...field}
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
            {viewImages.length > 0 && (
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
            )}
          </div>

          <div className="flex flex-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddRooms