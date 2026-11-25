import { api } from "./api";

export type MediaType = "movie" | "tv";

export interface MediaItem {
  id: number;
  title: string;
  type: MediaType;
  poster_path: string | null;
  vote_average: number;
  overview: string;
}

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
}

interface MoviesResponse {
  results: MediaItem[];
}

interface PopularMoviesResponse {
  results: TmdbMovie[];
}

// Récupère les films populaires depuis le backend
export async function getMovies(): Promise<MoviesResponse> {
  const response = await api.get<PopularMoviesResponse>("/movies");

  return {
    results: response.data.results.map((movie) => ({
      ...movie,
      type: "movie",
    })),
  };
}

// Recherche les films et les séries depuis le backend
export async function searchMovies(query: string): Promise<MoviesResponse> {
  const response = await api.get<MoviesResponse>("/movies/search", {
    params: {
      q: query,
    },
  });

  return response.data;
}
