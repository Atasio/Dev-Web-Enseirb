<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMoviesStore } from "../stores/movies.store";

const router = useRouter();
const moviesStore = useMoviesStore();
const isOpen = ref(false);
const searchTerm = ref("");
const searchInput = ref<HTMLInputElement | null>(null);
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

// Ouvre la barre et place le curseur dans le champ
async function openSearch() {
  isOpen.value = true;
  searchTerm.value = moviesStore.query;
  await nextTick();
  searchInput.value?.focus();
}

// Ferme la barre et réinitialise les résultats
function closeSearch() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  isOpen.value = false;
  searchTerm.value = "";
  moviesStore.resetSearch();
}

// Exécute la recherche et redirige vers l’accueil
async function executeSearch(query: string) {
  if (router.currentRoute.value.name !== "home") {
    await router.push({ name: "home" });
  }

  await moviesStore.runSearch(query);
}

// Attend 300 ms avant de lancer la recherche
function scheduleSearch(query: string) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  if (!query.trim()) {
    moviesStore.resetSearch();
    return;
  }

  moviesStore.prepareSearch(query);

  debounceTimer = setTimeout(() => {
    void executeSearch(query);
  }, 300);
}

watch(searchTerm, scheduleSearch);

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<template>
  <div class="flex min-w-0 items-center justify-end">
    <button
      v-if="!isOpen"
      type="button"
      class="rounded-full p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
      aria-label="Ouvrir la recherche"
      @click="openSearch"
    >
      <svg
        class="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </button>

    <div
      v-else
      class="flex w-full min-w-0 items-center gap-2 border-b border-zinc-500 sm:w-72"
    >
      <svg
        class="size-5 shrink-0 text-zinc-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        ref="searchInput"
        v-model="searchTerm"
        type="text"
        class="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-zinc-500"
        placeholder="Films et séries..."
        aria-label="Rechercher un film ou une série"
        @keydown.esc="closeSearch"
      />

      <button
        type="button"
        class="shrink-0 rounded-full p-1 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        aria-label="Fermer la recherche"
        @click="closeSearch"
      >
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  </div>
</template>
