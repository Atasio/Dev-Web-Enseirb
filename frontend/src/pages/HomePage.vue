<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import MovieCard from "../components/MovieCard.vue";
import { useMoviesStore } from "../stores/movies.store";

const moviesStore = useMoviesStore();
const {
  query,
  popularMovies,
  searchResults,
  isSearching,
  loading,
  error,
} = storeToRefs(moviesStore);

const displayedMovies = computed(() =>
  isSearching.value ? searchResults.value : popularMovies.value,
);

const sectionTitle = computed(() =>
  isSearching.value
    ? `Résultats pour « ${query.value} »`
    : "Films populaires",
);

onMounted(() => {
  void moviesStore.fetchPopularMovies();
});
</script>

<template>
  <div class="mx-auto w-full max-w-7xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#e50914]">
        Bienvenue sur SeenFlix
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Films et séries à découvrir
      </h1>
    </header>

    <section aria-live="polite">
      <h2 class="mb-6 text-xl font-semibold text-white sm:text-2xl">
        {{ sectionTitle }}
      </h2>

      <p v-if="loading" class="py-16 text-center text-zinc-400">
        {{ isSearching ? "Recherche en cours..." : "Chargement des films..." }}
      </p>

      <p v-else-if="error" class="rounded-lg bg-red-950/40 px-4 py-8 text-center text-red-300">
        {{ error }}
      </p>

      <p
        v-else-if="displayedMovies.length === 0"
        class="rounded-lg bg-zinc-900 px-4 py-12 text-center text-zinc-400"
      >
        {{ isSearching
          ? "Aucun film ou série ne correspond à cette recherche."
          : "Aucun film populaire n’est disponible." }}
      </p>

      <div
        v-else
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <MovieCard
          v-for="movie in displayedMovies"
          :key="`${movie.type}-${movie.id}`"
          :movie="movie"
        />
      </div>
    </section>
  </div>
</template>
