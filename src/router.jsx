import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import GuestLayout from './layouts/GuestLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import LeaderBoardPage from './pages/LeaderBoardPage';

const routerConfig = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        handle: { name: 'Beranda' },
      },
      {
        path: '/search',
        element: <SearchPage />,
        handle: { name: 'Pencarian' },
      },
      {
        path: '/leaderboard',
        element: <LeaderBoardPage />,
        handle: { name: 'Leaderboard' },
      },
      {
        path: '/thread/:id',
        element: <DetailPage />,
        handle: { name: 'Detail Thread' },
      },
    ],
  },
  {
    path: '/guest',
    element: <GuestLayout />,
    children: [
      {
        path: '/guest',
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    handle: { name: 'Tidak Ditemukan' },
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
