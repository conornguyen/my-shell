import {
 ColumnDef,
 flexRender,
 getCoreRowModel,
 useReactTable,
} from '@tanstack/react-table';
import React from 'react';
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
import {
 horizontalListSortingStrategy,
 arrayMove,
 SortableContext,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


interface DataTableProps<TData, TValue> {
 columns: ColumnDef<TData, TValue>[]
 data: TData[]
}

const DraggableTableHeader = ({
                               header,
                              }: {
 header: Header<Person, unknown>
}) => {
 const { attributes, isDragging, listeners, setNodeRef, transform } =
  useSortable({
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
  <TableHead  colSpan={header.colSpan} ref={setNodeRef} style={style}>
   {header.isPlaceholder
    ? null
    : flexRender(header.column.columnDef.header, header.getContext())}
   <button {...attributes} {...listeners}>
    $
   </button>
  </TableHead >
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
  <TableCell key={cell.id} style={style} ref={setNodeRef}>
   {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </TableCell>
 );
};


export function DataTable<TData, TValue>({
                                          columns,
                                          data,
                                         }: DataTableProps<TData, TValue>) {

 const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
  columns.map(c => c.id!),
 );

 const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  state: {
   columnOrder,
  },
  onColumnOrderChange: setColumnOrder,
  debugTable: true,
  debugHeaders: true,
  debugColumns: true,
 });

 function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (active && over && active.id !== over.id) {
   setColumnOrder(columnOrder => {
    const oldIndex = columnOrder.indexOf(active.id as string);
    const newIndex = columnOrder.indexOf(over.id as string);
    return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
   });
  }
 }

 const sensors = useSensors(
  useSensor(MouseSensor, {}),
  useSensor(TouchSensor, {}),
  useSensor(KeyboardSensor, {}),
 );


 return (
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
           <DraggableTableHeader key={header.id} header={header}>
            {header.isPlaceholder
             ? null
             : flexRender(
              header.column.columnDef.header,
              header.getContext(),
             )}
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
           <DragAlongCell key={cell.id} cell={cell}/>
          </SortableContext>
         ))}
        </TableRow>
       ))
      ) : (
       <TableRow>
        <TableCell colSpan={columns.length} className='h-24 text-center'>
         No results.
        </TableCell>
       </TableRow>
      )}
     </TableBody>
    </Table>
   </div>
  </DndContext>
 );
}