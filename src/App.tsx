import { useState } from 'react';
import './App.css';
import React, { Suspense } from 'react';
import SaleApp from './page/my-shell-sale/index';
import AuthProvider from './provider/auth-provider';
import Routes from './routes/routes';


function App() {
 return (
   <AuthProvider>
     <Routes />
   </AuthProvider>
 );
}

export default App;
