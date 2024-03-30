export interface FetchStaff {
  data: staffProps[]
}
export interface FetchSingleWorker {
  data: staffProps
}

export interface staffProps {
  _id: string
  name: string
  position: string
  phoneNumber: string
  email: string
  address: string
}