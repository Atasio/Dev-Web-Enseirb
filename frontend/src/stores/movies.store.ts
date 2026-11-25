import { defineStore } from "pinia";
import {
  getMovies,
  searchMovies,
  type MediaItem,
} from "../services/movies.service";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    query: "",
    popularMovies: [] as MediaItem[],
    searchResults: [] as MediaItem[],
    popularLoading: false,
    searchLoading: false,
    popularError: "",
    searchError: "",
    latestSearchRequest: 0,
  }),

  getters: {
    isSearching: (state) => state.query.trim().length > 0,
    loading: (state) =>
      state.query.trim().length > 0
        ? state.searchLoading
        : state.popularLoading,
    error: (state) =>
      state.query.trim().length > 0 ? state.searchError : state.popularError,
  },

  actions: {
    // Charge les films populaires une seule fois
    async fetchPopularMovies() {
      if (this.popularMovies.length > 0 || this.popularLoading) {
        return;
      }

      this.popularLoading = true;
      this.popularError = "";

      try {
        const data = await getMovies();
        this.popularMovies = data.results;
      } catch (error) {
        this.popularError = "Impossible de récupérer les films populaires.";
        console.error(error);
      } finally {
        this.popularLoading = false;
      }
    },

    // Prépare une nouvelle recherche pendant le délai de saisie
    prepareSearch(query: string) {
      this.latestSearchRequest += 1;
      this.query = query.trim();
      this.searchResults = [];
      this.searchLoading = true;
      this.searchError = "";
    },

    // Lance une recherche et ignore les réponses devenues obsolètes
    async runSearch(query: string) {
      const normalizedQuery = query.trim();

      if (!normalizedQuery) {
        this.resetSearch();
        return;
      }

      this.query = normalizedQuery;
      this.searchLoading = true;
      this.searchError = "";
      const requestId = ++this.latestSearchRequest;

      try {
        const data = await searchMovies(normalizedQuery);

        if (requestId === this.latestSearchRequest) {
          this.searchResults = data.results;
        }
      } catch (error) {
        if (requestId === this.latestSearchRequest) {
          this.searchResults = [];
          this.searchError = "Impossible d’effectuer la recherche.";
          console.error(error);
        }
      } finally {
        if (requestId === this.latestSearchRequest) {
          this.searchLoading = false;
        }
      }
    },

    // Réinitialise la recherche et réaffiche les films populaires
    resetSearch() {
      this.latestSearchRequest += 1;
      this.query = "";
      this.searchResults = [];
      this.searchLoading = false;
      this.searchError = "";
    },
  },
});
