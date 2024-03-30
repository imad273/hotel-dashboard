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
import SuccessAlert from 'components/Alerts/SuccessAlert'
import FailsAlert from 'components/Alerts/FailsAlert'
import LoadingBadge from 'components/loading/LoadingBadge'
import { useEditWorker, useGetSingleWorker } from 'hooks'
import { useNavigate, useParams } from 'react-router-dom'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Member Name is required",
  }),
  position: z.string().min(2, {
    message: "Position is required",
  }),
  phoneNumber: z.string().min(2, {
    message: "Position is required",
  }).regex(phoneRegex, 'Invalid phone number!'),
  email: z.string().min(2, {
    message: "Email is required",
  }).email({ message: "Invalid email address" }),
  address: z.string().min(2, {
    message: "Address is required",
  })
})

const EditWorker = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  })

  const { GetWorker, data, isLoading } = useGetSingleWorker();
  const { editWorker, data: uploadData, error, isLoading: editLoading } = useEditWorker();

  const params = useParams();

  useEffect(() => {
    GetWorker(params.id)
  }, [params]);

  useEffect(() => {
    if (data !== undefined) {
      form.setValue('name', data.data.name)
      form.setValue('position', data.data.position)
      form.setValue('phoneNumber', data.data.phoneNumber)
      form.setValue('email', data.data.email)
      form.setValue('address', data.data.address)
    }
  }, [data]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    params.id !== undefined && editWorker(values, params.id)
  }

  const [successAlert, setSuccessAlert] = useState(false)
  const [failsAlert, setFailsAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setFailsAlert(true);
      setAlertMsg("There was an error while updating the worker");
      return
    }

    if (uploadData !== undefined) {
      setSuccessAlert(true);
      setAlertMsg("Item Updated Successfully");

      setTimeout(() => {
        navigate('/staff')
      }, 2000)
    }
  }, [uploadData, error]);

  return (
    <div className='relative p-5 rounded bg-dark_bg'>
      {successAlert && <SuccessAlert setSuccessAlert={setSuccessAlert}>{alertMsg}</SuccessAlert>}
      {failsAlert && <FailsAlert setFailsAlert={setFailsAlert}>{alertMsg}</FailsAlert>}

      {isLoading && <LoadingBadge />}

      <div className='mb-6'>
        <h3 className='text-2xl font-semibold'>Create a Staff member</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member Name</FormLabel>
                <FormControl>
                  <Input placeholder="emad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="manager..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder='+123 255-8566' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='example@service.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder='address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end w-full">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditWorker