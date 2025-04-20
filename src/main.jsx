import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import store from './stores';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import 'nprogress/nprogress.css';
import { AppProvider } from './context/AppProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppProvider>
  </StrictMode>,
);
