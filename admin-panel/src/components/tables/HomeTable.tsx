import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'components/ui/Table'

const HomeTable = () => {

  const head = [
    "Invoice",
    "Status",
    "Method",
    "Amount",
  ]

  const data = [
    {
      id: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "250.00",
    },
    {
      id: "INV002",
      status: "Pending",
      method: "Cash",
      amount: "150.00",
    },
    {
      id: "INV003",
      status: "Paid",
      method: "Credit Card",
      amount: "350.00",
    },
    {
      id: "INV004",
      status: "Pending",
      method: "Credit Card",
      amount: "250.00",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {
            head.map(head => (
              <TableHead key={head} className={`${head === "Amount" && "text-right"}`}>{head}</TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.map(data => (
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>{data.method}</TableCell>
              <TableCell className="text-right">${data.amount}</TableCell>
            </TableRow>
          ))
        }
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  )
}

export default HomeTable