const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

class MovieService {
  constructor() {
    this.api_key = API_KEY;
  }
  async request(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.api_key}`,
      },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  }
  catch(error) {
    console.log("MovieService error", error);
    return null;
  }

  getPopularMovies(page = 1) {
    return this.request("/movie/popular", { page });
  }

  getCategoryMovie() {
    return this.request("/genre/movie/list");
  }
}

export default new MovieService();
