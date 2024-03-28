import React from 'react';


import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '@/component/table';
import { makeData, Person } from './makeData'


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
 id: string
 amount: number
 status: "pending" | "processing" | "success" | "failed"
 email: string
}


 function getData(): Payment[]{
 // Fetch data from your API here.
 return [
  {
   id: "728ed52f",
   amount: 100,
   status: "pending",
   email: "m@example.com",
  },
 ]
}


const ListUser =  () => {
 const columns = React.useMemo<ColumnDef<Person>[]>(
  () => [
   {
    accessorKey: 'firstName',
    cell: info => info.getValue(),
    id: 'firstName',
    size: 150,
   },
   {
    accessorFn: row => row.lastName,
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
    id: 'lastName',
    size: 150,
   },
   {
    accessorKey: 'age',
    header: () => 'Age',
    id: 'age',
    size: 120,
   },
   {
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
    id: 'visits',
    size: 120,
   },
   {
    accessorKey: 'status',
    header: 'Status',
    id: 'status',
    size: 150,
   },
   {
    accessorKey: 'progress',
    header: 'Profile Progress',
    id: 'progress',
    size: 180,
   },
  ],
  []
 )
 return <div>
  <DataTable columns={columns} data={makeData(20)} />
 </div>;
};

export default ListUser;
