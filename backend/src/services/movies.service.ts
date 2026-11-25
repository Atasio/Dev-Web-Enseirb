import { tmdbSearchResponseSchema } from "../schemas/movies.schema.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Récupération des films populaires
export async function getMovies() {
  const token = process.env.TMDB_API_KEY;

  if (!token) {
    throw new Error("La variable d'environnement TMDB_API_KEY est manquante.");
  }

  const response = await fetch(`${TMDB_BASE_URL}/movie/popular?language=fr-FR`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  return response.json();
}


// Recherche, validation et uniformisation des films et des séries
export async function searchMovies(query: string) {
  const token = process.env.TMDB_API_KEY;

  if (!token) {
    throw new Error("La variable d'environnement TMDB_API_KEY est manquante.");
  }

  const url = new URL(`${TMDB_BASE_URL}/search/multi`);

  url.searchParams.set("query", query);
  url.searchParams.set("language", "fr-FR");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.statusText}`);
  }

  const rawData = await response.json();

  const validation = tmdbSearchResponseSchema.safeParse(rawData);

  if (!validation.success) {
    throw new Error("La réponse de TMDB est invalide.");
  }

  const data = validation.data;

  const filteredResults = data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );

  const results = filteredResults.map((item) => ({
    id: item.id,
    title: item.media_type === "movie" ? item.title : item.name,
    type: item.media_type,
    poster_path: item.poster_path,
    vote_average: item.vote_average,
    overview: item.overview
  }));

  return {
    page: data.page,
    results: results,
    total_pages: data.total_pages,
    total_results: data.total_results
  };
}