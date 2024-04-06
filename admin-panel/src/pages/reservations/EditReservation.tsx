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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Input } from "../../components/ui/Input"
import { Textarea } from "../../components/ui/textarea"
import { CalendarIcon } from 'lucide-react'
import SuccessAlert from 'components/Alerts/SuccessAlert'
import FailsAlert from 'components/Alerts/FailsAlert'
import LoadingBadge from 'components/loading/LoadingBadge'
import { useNavigate, useParams } from 'react-router-dom'
import { Popover, PopoverTrigger, PopoverContent } from 'components/ui/popover'
import { cn } from 'lib/utils'
import { Calendar } from 'components/ui/calendar'
import { useGetRooms, useGetSingleReservation, useEditReservation } from 'hooks'
import NoDataAlert from 'components/Alerts/NoDataAlert'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  room: z.string().min(2, {
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
    invalid_type_error: "Format invalid",
    // check if check-in date is not in the past 
  }),
  checkOut: z.date({
    required_error: "Please select a Check-out date",
    invalid_type_error: "Format invalid",
    // check if check-out date is not in the same check-in or under today time
  }).min(new Date(), { message: "Invalid Date" }),
  cost: z.coerce.number().gte(1, {
    message: "Cost is required",
  }),
  paymentStatus: z.boolean(),
  note: z.string(),
})

const EditReservation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room: "",
      guestName: "",
      phoneNumber: "",
      email: "",
      cost: 0,
      paymentStatus: false,
      note: "",
    }
  })

  const [successAlert, setSuccessAlert] = useState(false)
  const [failsAlert, setFailsAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const handleChangePayment = (value: string) => {
    form.setValue('paymentStatus', value === "paid" ? true : false);
  };

  const { GetReservation, data, isLoading: getGetReservationLoading } = useGetSingleReservation();
  const params = useParams();

  useEffect(() => {
    GetReservation(params.id)
  }, [params]);

  useEffect(() => {
    console.log(data);
    if (data !== undefined) {
      form.setValue('room', data.data.room._id)
      form.setValue('guestName', data.data.guestName)
      form.setValue('phoneNumber', data.data.phoneNumber)
      form.setValue('email', data.data.email)
      form.setValue('cost', data.data.cost)
      form.setValue('checkIn', new Date(data.data.checkIn))
      form.setValue('checkOut', new Date(data.data.checkOut))
      form.setValue('paymentStatus', data.data.paymentStatus)
      form.setValue('note', data.data.note || "")
    }
  }, [data]);

  const { editReservation, data: uploadData, error, isLoading: editLoading } = useEditReservation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    params.id !== undefined && editReservation(values, params.id);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setFailsAlert(true);
      setAlertMsg("There was an error while editing the reservation");
      return
    }

    if (uploadData !== undefined) {
      setSuccessAlert(true);
      setAlertMsg("Reservation Edited Successfully");

      /* setTimeout(() => {
        navigate('/reservations')
      }, 2000); */
    }
  }, [uploadData, error]);

  const { GetRooms, data: roomsData, isLoading } = useGetRooms();

  const fetchRooms = async () => await GetRooms();

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className='relative p-5 rounded bg-dark_bg'>
      {successAlert && <SuccessAlert setSuccessAlert={setSuccessAlert}>{alertMsg}</SuccessAlert>}
      {failsAlert && <FailsAlert setFailsAlert={setFailsAlert}>{alertMsg}</FailsAlert>}

      {isLoading || getGetReservationLoading || editLoading && <LoadingBadge />}

      <div className='mb-6'>
        <h3 className='text-2xl font-semibold'>Edit Reservation</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <Select onValueChange={(event) => form.setValue('room', event)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={data?.data.room.number || "Room number"} />
                  </SelectTrigger>
                  <SelectContent className='min-h-[200px] overflow-y-scroll'>
                    {roomsData?.data.length === 0 /* roomsData?.data.filter(room => room._id !== data?.data.room._id).every(room => room.availability === false) */ ?
                      <NoDataAlert dataType="Rooms" />
                      :
                      <>
                        <SelectItem value={data?.data.room._id || "pre"} className='cursor-pointer'>{data?.data.room.number}</SelectItem>
                        {roomsData?.data.map(room => (
                          room.availability &&
                          <SelectItem key={room._id} value={room._id} className='cursor-pointer'>{room.number}</SelectItem>
                        ))
                        }
                      </>
                    }
                  </SelectContent>
                </Select>
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
                <FormItem className='w-full'>
                  <FormLabel>Check-in date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal hover:bg-transparent",
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Check-in date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal hover:bg-transparent",
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
                  <FormMessage />
                </FormItem>
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
                  <Select onValueChange={(event) => handleChangePayment(event)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={field.value === true ? "Paid" : "Pending"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending" className='cursor-pointer'>Pending</SelectItem>
                      <SelectItem value="paid" className='cursor-pointer'>Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <Textarea {...field} placeholder="Note." />
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

export default EditReservation