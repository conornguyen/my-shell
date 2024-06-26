import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '@/provider/auth-provider';
import { ProtectedRoute } from './protected-route';
import Login from '../containers/login';
import Register from '../containers/register/index';
import ListUserPage from '@/containers/list-user';

const Routes = () => {
 const { token } = useAuth();

 const routesForPublic = [
  {
   path: '/service',
   element: <div>Service Page</div>,
  },
  {
   path: '/about-us',
   element: <div>About Us</div>,
  },
 ];

 // Define routes accessible only to authenticated users
 const routesForAuthenticatedOnly = [
  {
   path: '/',
   element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
   children: [
    {
     path: '/logout',
     element: <div>Logout</div>,
    },
   ],
  },
 ];

 // Define routes accessible only to non-authenticated users
 const routesForNotAuthenticatedOnly = [
  {
   path: '/',
   element: <Navigate to={'login'} />,
  },
  {
   path: '/login',
   element: <Login />,
  },
  {
   path: '/register',
   element: <Register />,
  },
  {
   path: '/user',
   element: <ListUserPage />,
  },
 ];

 // Combine and conditionally include routes based on authentication status
 const router = createBrowserRouter([
  ...routesForPublic,
  ...(!token ? routesForNotAuthenticatedOnly : []),
  ...routesForAuthenticatedOnly,
 ]);

 // Provide the router configuration using RouterProvider
 return <RouterProvider router={router} />;
};

export default Routes;
