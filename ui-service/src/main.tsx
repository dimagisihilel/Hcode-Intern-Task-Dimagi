import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
//import client from './apollo/client';
import { mainClient } from "./apollo/client"; 

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={mainClient}>
      <App />
    </ApolloProvider>
    <ToastContainer />
  </React.StrictMode>
);
