const BASE_URL = "https://api.themoviedb.org/3";
const CLIENT_TOKEN =
  import.meta.env.VITE_TMDB_TOKEN || import.meta.env.VITE_API_TOKEN;

class MovieService {
  constructor() {
    this.token = CLIENT_TOKEN;
  }

  async request(endpoint, params = {}) {
    try {
      // In production (or when no client token is provided), use the Netlify Serverless Proxy.
      // This ensures the TMDB Token is never exposed in browser DevTools.
      const useProxy = import.meta.env.PROD || !this.token;

      let res;

      if (useProxy) {
        const url = new URL("/api/tmdb", window.location.origin);
        url.searchParams.append("endpoint", endpoint);
        Object.keys(params).forEach((key) => {
          if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
          }
        });

        res = await fetch(url.toString(), {
          method: "GET",
          headers: { accept: "application/json" },
        });

        // Fallback to direct fetch in local dev if proxy is unavailable but client token exists
        if (!res.ok && this.token) {
          const directUrl = new URL(`${BASE_URL}${endpoint}`);
          Object.keys(params).forEach((key) => {
            if (params[key] !== undefined && params[key] !== null) {
              directUrl.searchParams.append(key, params[key]);
            }
          });
          const fallbackRes = await fetch(directUrl.toString(), {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          });
          if (fallbackRes.ok) return await fallbackRes.json();
        }
      } else {
        // Direct call during local development
        const directUrl = new URL(`${BASE_URL}${endpoint}`);
        Object.keys(params).forEach((key) => {
          if (params[key] !== undefined && params[key] !== null) {
            directUrl.searchParams.append(key, params[key]);
          }
        });

        res = await fetch(directUrl.toString(), {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
      }

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      return await res.json();
    } catch (error) {
      console.log("MovieService error:", error);
      return null;
    }
  }

  getPopularMovies(page = 1) {
    return this.request("/movie/popular", { page });
  }

  getCategoryMovie() {
    return this.request("/genre/movie/list");
  }
}

export default new MovieService();
