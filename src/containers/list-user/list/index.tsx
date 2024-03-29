import React from 'react';
import { DataTable } from '@/component/table';
import { ColumnDef } from '@tanstack/react-table';
import { Person } from '@/containers/list-user/makeData';

export const ListUser = (props) => {
 const columns = React.useMemo<ColumnDef<Person>[]>(
  () => [
   {
    accessorKey: 'firstName',
    cell: (info) => info.getValue(),
    header: 'First Name',
    id: 'firstName',
    size: 150,
   },
   {
    accessorFn: (row) => row.lastName,
    cell: (info) => info.getValue(),
    header: 'Last Name',
    id: 'lastName',
    size: 150,
   },
   {
    accessorKey: 'age',
    header: 'Age',
    id: 'age',
    size: 120,
   },
   {
    accessorKey: 'visits',
    header: 'Visits',
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
  [],
 );
 return (
  <div className='p-4'>
   <DataTable columns={columns} />
  </div>
 );
};
