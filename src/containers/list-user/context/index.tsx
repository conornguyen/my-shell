import { PropsWithChildren, createContext, useContext } from 'react';
import { useUsers } from '@/containers/list-user/hooks/useUsers';

export type TUserContextValue = {
 state: ReturnType<typeof useUsers>;
};

const UserContext = createContext<TUserContextValue | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
 const state = useUsers();

 const contextValue: TUserContextValue = {
  state,
 };

 return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
 const context = useContext(UserContext);

 if (!context) {
  throw new Error('useUserContext must be used within a UserProvider');
 }
 return context;
};
