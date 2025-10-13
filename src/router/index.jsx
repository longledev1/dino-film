import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "@pages/Home";
import MovieDetails from "@pages/MovieDetail";
import TVShowDetail from "@/pages/TVShowDetail";
import SeasonDetail from "@/pages/SeasonDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <MovieDetails /> },
      { path: "tv/:id", element: <TVShowDetail /> },
      {
        path: "tv/:id/season/:number",
        element: <SeasonDetail />,
      },
    ],
  },
]);

export default router;
