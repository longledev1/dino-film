import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "@pages/Home";
import MovieDetails from "@pages/MovieDetail";
import TVShowDetail from "@/pages/TVShowDetail";
import SeasonDetail from "@/pages/SeasonDetail";
import PeopleDetail from "@/pages/People";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // ROUTE [HOME PAGE]
      { index: true, element: <Home /> },
      // ROUTE [MOVIE DETAIL]
      { path: "movie/:id", element: <MovieDetails /> },
      // ROUTE [TV DETAIL]
      { path: "tv/:id", element: <TVShowDetail /> },
      // ROUTE [SEASON DETAIL]
      {
        path: "tv/:id/season/:number",
        element: <SeasonDetail />,
      },
      // ROUTE [PEOPLE DETAIL]
      {
        path: "/people/:id",
        element: <PeopleDetail />,
      },
    ],
  },
]);

export default router;
