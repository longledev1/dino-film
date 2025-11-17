// Image base URL (w185, w342, w500, w780, original)
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// TOPIC
export const TOPIC = [
  {
    id: "marvel",
    label: "Marvel",
    color: "#536bd6",
  },

  {
    id: "anime",
    label: "Anime",
    color: "#807fa9",
  },
  {
    id: "sitcom",
    label: "Sitcom",
    color: "#419885",
  },
  {
    id: "time-travel",
    label: "Time-Travel",
    color: "#d59379",
  },
  {
    id: "historical",
    label: "Historical",
    color: "#b45a57",
  },
  {
    id: "political-drama",
    label: "Political Drama",
    color: "#e8b13e",
  },
  {
    id: "action",
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

export const POPULAR_REGIONS = [
  "US", // United States
  "GB", // United Kingdom
  "CA", // Canada
  "AU", // Australia
  "FR", // France
  "DE", // Germany
  "IT", // Italy
  "ES", // Spain
  "JP", // Japan
  "KR", // South Korea
  "CN", // China
  "IN", // India
  "TH", // Thailand
  "ID", // Indonesia
  "MX", // Mexico
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
  REGION: "/watch/providers/regions",
};

export const DETAILS_DATA = {
  MOVIE: (id) => `/movie/${id}?append_to_response=release_dates,credits,videos`,
  RECOMMENDATIONS_MOVIES: (id) => `/movie/${id}/recommendations`,
  TV: (id) => `/tv/${id}?append_to_response=content_ratings,credits,videos`,
  RECOMMENDATIONS_TV: (id) => `/tv/${id}/recommendations`,
  SEASONS_TV: (id, number) =>
    `/tv/${id}/season/${number}?append_to_response=content_ratings,credits,videos`,
  PERSON: (person_id) =>
    `/person/${person_id}?append_to_response=combined_credits`,
};

export const SEARCH_QUERY = {
  DISCOVER: (
    type = "movie",
    genres = [],
    country = "",
    minRating = 0,
    maxRating = 100,
    page = 1,
  ) => {
    const params = new URLSearchParams();

    if (genres.length) params.set("with_genres", genres.join(","));
    if (country) params.set("with_origin_country", country);
    params.set("vote_average.gte", (minRating / 10).toString());
    params.set("vote_average.lte", (maxRating / 10).toString());
    params.set("page", page.toString());

    return `/discover/${type}?${params.toString()}`;
  },

  MULTI: (query = "", page = 1) => {
    return {
      endpoint: "/search/multi",
      params: {
        query: query.trim(),
        language: "en-US",
        page,
      },
    };
  },

  MULTI_STRING: (query = "", page = 1) => {
    const params = new URLSearchParams({
      query: query.trim(),
      language: "en-US",
      page,
    });

    return `/search/multi?${params.toString()}`;
  },
};

export const MOOD_MEDIA_DATA = {
  marvel: (page = 1) =>
    `/discover/movie?with_companies=420&sort_by=popularity.desc&page=${page}`,

  anime: (page = 1) =>
    `/discover/movie?with_genres=16&with_keywords=210024&sort_by=popularity.desc&page=${page}`,

  sitcom: (page = 1) =>
    `/discover/tv?with_genres=35&with_keywords=9719&sort_by=popularity.desc&page=${page}`,

  time_travel: (page = 1) =>
    `/discover/movie?with_keywords=4379&sort_by=popularity.desc&page=${page}`,

  historical: (page = 1) =>
    `/discover/movie?with_genres=36&sort_by=vote_count.desc&page=${page}`,

  political_drama: (page = 1) =>
    `/discover/movie?with_keywords=9663,606&sort_by=popularity.desc&page=${page}`,

  action: (page = 1) =>
    `/discover/movie?with_genres=28&sort_by=popularity.desc&page=${page}`,
};
