import MovieServices from "./MovieServices";

export const movieFetcher = ([endpoint, params]) =>
  MovieServices.request(endpoint, params);
