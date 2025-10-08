import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "@pages/Home";
import MovieDetails from "@pages/MovieDetails";
import TVShowDetail from "@/pages/TVShowDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <MovieDetails /> },
      { path: "tv/:id", element: <TVShowDetail /> },
    ],
  },
]);

export default router;
