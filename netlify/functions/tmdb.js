/* global process */
// Netlify Serverless Function: TMDB API Proxy
// This runs 100% on the server, keeping the TMDB Token hidden from browser DevTools.

export default async (req) => {
  // 1. Read secret token from server environment variables
  // On Netlify, configure "TMDB_TOKEN" in Site settings -> Environment variables.
  const token =
    process.env.TMDB_TOKEN ||
    process.env.VITE_TMDB_TOKEN ||
    process.env.VITE_API_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({
        error:
          "Missing TMDB Token. Please set 'TMDB_TOKEN' in your Netlify site environment variables.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // 2. Parse target endpoint and query parameters
  const url = new URL(req.url);
  const endpoint = url.searchParams.get("endpoint") || "";

  if (!endpoint) {
    return new Response(
      JSON.stringify({ error: "Missing 'endpoint' query parameter." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Construct target TMDB API URL
  const tmdbUrl = new URL(
    `https://api.themoviedb.org/3${endpoint.startsWith("/") ? "" : "/"}${endpoint}`,
  );

  // Forward all query parameters (except 'endpoint')
  url.searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      tmdbUrl.searchParams.append(key, value);
    }
  });

  // 3. Request TMDB API securely from Netlify backend
  try {
    const tmdbRes = await fetch(tmdbUrl.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await tmdbRes.text();

    return new Response(data, {
      status: tmdbRes.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to communicate with TMDB API",
        message: error.message,
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
