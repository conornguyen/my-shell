import { DataTable } from '@/component/table';
import { useUserContext } from '@/containers/list-user/context';

export const ListUser = () => {
 const { state } = useUserContext();
 return (
  <div className='p-4'>
   <DataTable {...state} />
  </div>
 );
};
