import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import Home from "@pages/Home";
const MovieDetails = lazy(() => import("@pages/MovieDetail"));
const TVShowDetail = lazy(() => import("@pages/TVShowDetail"));
const SeasonDetail = lazy(() => import("@pages/SeasonDetail"));
const PeopleDetail = lazy(() => import("@/pages/People"));
const SearchPage = lazy(() => import("@/pages/Search"));
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
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
