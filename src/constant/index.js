// Image base URL (w185, w342, w500, w780, original)
export const imageTMDB = "https://image.tmdb.org/t/p";

// TOPIC
export const TOPIC = [
  {
    id: 1,
    label: "Marvel",
    color: "#536bd6",
  },

  {
    id: 2,
    label: "4K",
    color: "#807fa9",
  },
  {
    id: 3,
    label: "Sitcom",
    color: "#419885",
  },
  {
    id: 4,
    label: "Time-Travel",
    color: "#d59379",
  },
  {
    id: 5,
    label: "Historical",
    color: "#b45a57",
  },
  {
    id: 6,
    label: "Political Drama",
    color: "#e8b13e",
  },
  {
    id: 7,
    label: "Action",
    color: "#041e41",
  },
];

// Tabs for Trending and Top Rated
export const TABS_TRENDING = [
  {
    id: "all",
    name: "ALL",
    url: "/trending/all/day",
  },
  {
    id: "movie",
    name: "Movies",
    url: "/trending/movie/day",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "/trending/tv/day",
  },
];

export const TABS_TOP_RATED = [
  {
    id: "movie",
    name: "Movies",
    url: "/movie/top_rated",
  },
  {
    id: "tv",
    name: "TV Show",
    url: "/tv/top_rated",
  },
];

// base url genres
export const GENRES_URL = "/genre/movie/list";

// Media data fetch URLs
export const MEDIA_DATA = {
  NOW_PLAYING_MOVIES: "/movie/now_playing",
  POPULAR_MOVIES: "/movie/popular",
  TRENDING_TV: "/trending/tv/day",
  TRENDING_MOVIES: "/trending/movie/day",
  CHINESE_MOVIES: "/discover/movie?with_original_language=zh",
  DISNEY_MOVIES: "/discover/movie?with_companies=2",
  ANIME_MOVIES:
    "/discover/movie?with_genres=16&with_original_language=ja&sort_by=popularity.desc",
};
