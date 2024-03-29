import { useState } from 'react';
import './App.css';
import React, { Suspense } from 'react';
import AuthProvider from './provider/auth-provider';
import Routes from './routes/routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
 const queryClient = new QueryClient();
 return (
  <AuthProvider>
   <QueryClientProvider client={queryClient}>
    <Routes />
   </QueryClientProvider>
  </AuthProvider>
 );
}

export default App;
