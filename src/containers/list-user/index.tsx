import React from 'react';

import { UserProvider } from '@/containers/list-user/context';
import { ListUser } from '@/containers/list-user/list';

const ListUserPage = () => {
 return (
  <UserProvider>
   <ListUser />
  </UserProvider>
 );
};

export default ListUserPage;
