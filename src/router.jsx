import { createBrowserRouter, Navigate } from "react-router-dom";
import ArchivePage from "./pages/ArchivePage";
import HomePage from "./pages/HomePage";
import NotfoundPage from "./pages/NotfoundPage";
import SearchPage from "./pages/SearchPage";
import DefaultLayout from "./layouts/DefaultLayout";
import DetailPage from "./pages/DetailPage";
import GuestLayout from "./layouts/GuestLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const routerConfig = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        handle: { name: "Beranda" },
      },
      {
        path: "/archive",
        element: <ArchivePage />,
        handle: { name: "Arsip" },
      },
      {
        path: "/search",
        element: <SearchPage />,
        handle: { name: "Pencarian" },
      },
      {
        path: "/notes/:id",
        element: <DetailPage />,
        handle: { name: "Detail Catatan" },
      },
    ],
  },
  {
    path: "/guest",
    element: <GuestLayout />,
    children: [
      {
        path: "/guest",
        element: <Navigate to="login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotfoundPage />,
    handle: { name: "Halaman Tidak Ditemukan" },
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
