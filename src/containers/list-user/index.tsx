import React, { useContext } from 'react';

import { UserProvider, useUserContext } from '@/containers/list-user/context';
import { ListUser } from '@/containers/list-user/list';

const ListUserPage = () => {
 return (
  <UserProvider>
   <ListUser />
  </UserProvider>
 );
};

export default ListUserPage;
