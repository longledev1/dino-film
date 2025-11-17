import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import Home from "@pages/Home";
const MovieDetails = lazy(() => import("@pages/MovieDetail"));
const TVShowDetail = lazy(() => import("@pages/TVShowDetail"));
const SeasonDetail = lazy(() => import("@pages/SeasonDetail"));
const PeopleDetail = lazy(() => import("@/pages/People"));
const SearchPage = lazy(() => import("@/pages/Search"));
const MediaResults = lazy(() => import("@/pages/Home/MediaResults"));
const MoodPage = lazy(() => import("@/pages/Home/ExploreMood"));

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

      // ROUTE [SEARCH PAGE]
      {
        path: "/search",
        element: <SearchPage />,
      },

      // ROUTE [SEARCH RESULTS PAGE]
      {
        path: "/media/results",
        element: <MediaResults />,
      },

      // ROUTE [EXPLORE MOOD]
      {
        path: "/explore/:type",
        element: <MoodPage />,
      },
    ],
  },
]);

export default router;
