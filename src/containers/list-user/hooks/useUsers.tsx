import React from 'react';
import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';
import { fetchData, Person } from '@/containers/list-user/makeData.ts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useUsers = () => {
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
 const [pagination, setPagination] = React.useState<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
 });
 const [columnOrder, setColumnOrder] = React.useState<string[]>(() => columns.map((c) => c.id!));
 const [sorting, setSorting] = React.useState<SortingState>([]);
 const [columnVisibility, setColumnVisibility] = React.useState({});

 const dataQuery = useQuery({
  queryKey: ['data', pagination],
  queryFn: () => fetchData(pagination),
  placeholderData: keepPreviousData,
 });

 return {
  data: dataQuery,
  pagination,
  setPagination,
  columnOrder,
  setColumnOrder,
  sorting,
  setSorting,
  columnVisibility,
  setColumnVisibility,
  columns,
 };
};
