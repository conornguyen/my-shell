import React, { CSSProperties } from 'react';
import {
 Cell,
 ColumnDef,
 Header,
 flexRender,
 getCoreRowModel,
 getSortedRowModel,
 getPaginationRowModel,
 useReactTable,
 PaginationState,
 SortingState,
} from '@tanstack/react-table';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table';

import {
 DndContext,
 KeyboardSensor,
 MouseSensor,
 TouchSensor,
 closestCenter,
 DragEndEvent,
 useSensor,
 defaultDropAnimationSideEffects,
 useSensors,
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { fetchData, Person } from '@/containers/list-user/makeData';
import { Button } from '@/components/ui/button';

const DraggableTableHeader = ({ header }: { header: Header<Person, unknown> }) => {
 const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
  id: header?.column?.id,
 });

 const style: CSSProperties = {
  opacity: isDragging ? 0.8 : 1,
  position: 'relative',
  transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
  transition: 'width transform 0.2s ease-in-out',
  whiteSpace: 'nowrap',
  width: header.column.getSize(),
  zIndex: isDragging ? 1 : 0,
 };

 return (
  <TableHead
   colSpan={header.colSpan}
   ref={setNodeRef}
   style={style}
  >
   {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
   <button
    {...attributes}
    {...listeners}
   >
    $
   </button>
  </TableHead>
 );
};

const DragAlongCell = ({ cell }: { cell: Cell<Person, unknown> }) => {
 const { isDragging, setNodeRef, transform } = useSortable({
  id: cell.column.id,
 });

 const style: CSSProperties = {
  opacity: isDragging ? 0.8 : 1,
  position: 'relative',
  transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
  transition: 'width transform 0.2s ease-in-out',
  width: cell.column.getSize(),
  zIndex: isDragging ? 1 : 0,
 };

 return (
  <TableCell
   key={cell.id}
   style={style}
   ref={setNodeRef}
  >
   {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </TableCell>
 );
};

export function DataTable<TData, TValue>(props) {
 const {
  columnVisibility,
  pagination,
  columnOrder,
  sorting,
  columns,
  data,
  setSorting,
  setColumnVisibility,
  setColumnOrder,
  setPagination,
 } = props;

 const defaultData = React.useMemo(() => [], []);
 const table = useReactTable({
  data: data?.data?.rows ?? defaultData,
  columns,
  rowCount: data?.data?.rowCount,
  manualPagination: true,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
   columnVisibility,
   pagination,
   columnOrder,
   sorting,
  },
  onSortingChange: setSorting,
  onColumnVisibilityChange: setColumnVisibility,
  onColumnOrderChange: setColumnOrder,
  onPaginationChange: setPagination,
  debugTable: true,
  debugHeaders: true,
  debugColumns: true,
 });

 const sensors = useSensors(
  useSensor(MouseSensor, {}),
  useSensor(TouchSensor, {}),
  useSensor(KeyboardSensor, {}),
 );

 function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (active && over && active.id !== over.id) {
   setColumnOrder((columnOrder) => {
    const oldIndex = columnOrder.indexOf(active.id as string);
    const newIndex = columnOrder.indexOf(over.id as string);
    return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
   });
  }
 }

 return (
  <>
   {table.getAllLeafColumns().map((item) => {
    return (
     <div
      key={item.id}
      className='px-1'
     >
      <label>
       <input
        {...{
         type: 'checkbox',
         checked: item.getIsVisible(),
         onChange: item.getToggleVisibilityHandler(),
        }}
       />
       {item.id}
      </label>
     </div>
    );
   })}
   <DndContext
    collisionDetection={closestCenter}
    modifiers={[restrictToHorizontalAxis]}
    onDragEnd={handleDragEnd}
    sensors={sensors}
   >
    <div className='rounded-md border'>
     <Table>
      <TableHeader>
       {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
         <SortableContext
          items={columnOrder}
          strategy={horizontalListSortingStrategy}
         >
          {headerGroup.headers.map((header) => {
           return (
            <DraggableTableHeader
             key={header.id}
             header={header}
            >
             {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
            </DraggableTableHeader>
           );
          })}
         </SortableContext>
        </TableRow>
       ))}
      </TableHeader>
      <TableBody>
       {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
         <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
         >
          {row.getVisibleCells().map((cell) => (
           <SortableContext
            key={cell.id}
            items={columnOrder}
            strategy={horizontalListSortingStrategy}
           >
            <DragAlongCell
             key={cell.id}
             cell={cell}
            />
           </SortableContext>
          ))}
         </TableRow>
        ))
       ) : (
        <TableRow>
         <TableCell
          colSpan={columns.length}
          className='h-24 text-center'
         >
          No results.
         </TableCell>
        </TableRow>
       )}
      </TableBody>
     </Table>
    </div>
   </DndContext>
   <div className='flex items-center justify-end space-x-2 py-4'>
    <Button
     variant='outline'
     size='sm'
     onClick={() => table.previousPage()}
     disabled={!table.getCanPreviousPage()}
    >
     Previous
    </Button>
    <Button
     variant='outline'
     size='sm'
     onClick={() => table.nextPage()}
     disabled={!table.getCanNextPage()}
    >
     Next
    </Button>
   </div>
  </>
 );
}
