import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Input } from "../../components/ui/Input"
import { Textarea } from "../../components/ui/textarea"
import CustomFileInput from 'components/ui/customFileInput'
import { CalendarIcon, ChevronsUpDown } from 'lucide-react'
import { useAddRoom } from '../../hooks/rooms/useAddRoom'
import SuccessAlert from 'components/Alerts/SuccessAlert'
import FailsAlert from 'components/Alerts/FailsAlert'
import LoadingBadge from 'components/loading/LoadingBadge'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverTrigger, PopoverContent } from 'components/ui/popover'
import { cn } from 'lib/utils'
import { Calendar } from 'components/ui/calendar'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  roomNumber: z.string().min(2, {
    message: "Room Number is required",
  }),
  guestName: z.string().min(1, {
    message: "Guest Name is required",
  }),
  phoneNumber: z.string().min(2, {
    message: "Phone number is required",
  }).regex(phoneRegex, 'Invalid phone number!'),
  email: z.string().min(2, {
    message: "Email is required",
  }).email({ message: "Invalid email address" }),
  checkIn: z.date({
    required_error: "Please select a Check-in date",
  }),
  checkOut: z.date({
    required_error: "Please select a Check-out date",
  }),
  cost: z.number().gte(1, {
    message: "Cost is required",
  }),
  paymentStatus: z.boolean(),
})

const AddReservation = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: "",
      guestName: "",
      phoneNumber: "",
      email: "",
      cost: 0,
      paymentStatus: false
    },
  })

  const [successAlert, setSuccessAlert] = useState(false)
  const [failsAlert, setFailsAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const handleChange = (value: string) => {
    form.setValue('paymentStatus', value === "paid" ? true : false);
  };

  const onSubmit = () => {

  }

  return (
    <div className='relative p-5 rounded bg-dark_bg'>
      {successAlert && <SuccessAlert setSuccessAlert={setSuccessAlert}>{alertMsg}</SuccessAlert>}
      {failsAlert && <FailsAlert setFailsAlert={setFailsAlert}>{alertMsg}</FailsAlert>}

      {/* isLoading && <LoadingBadge /> */}

      <div className='mb-6'>
        <h3 className='text-2xl font-semibold'>Create a Reservation</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="py-2 space-y-3">
            <h3 className='text-xl font-semibold'>Guest Information</h3>
            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Name</FormLabel>
                  <FormControl>
                    <Input placeholder="emad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center w-full gap-2'>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className='w-full'>
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
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='example@service.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>

          <div className='flex items-center w-full gap-2 py-2'>
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal hover:bg-transparent",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2 text-white" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className='text-gray-400'>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal hover:bg-transparent",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2 text-white" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className='text-gray-400'>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

          </div>

          <div className="py-2 space-y-3">
            <h3 className='text-xl font-semibold'>Payment Information</h3>

            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="255" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <Select onValueChange={(event) => handleChange(event)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value === true ? "Paid" : "Pending"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end w-full">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div >
  )
}

export default AddReservation