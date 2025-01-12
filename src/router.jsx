import { createBrowserRouter } from "react-router-dom";
import ArchivePage from "./pages/ArchivePage";
import HomePage from "./pages/HomePage";
import NotfoundPage from "./pages/NotfoundPage";
import SearchPage from "./pages/SearchPage";
import DefaultLayout from "./layouts/DefaultLayout";
import DetailPage from "./pages/DetailPage";

const routerConfig = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        handle: { name: "Home" },
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
    path: "*",
    element: <NotfoundPage />,
    handle: { name: "Halaman Tidak Ditemukan" },
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
