<script setup lang="ts">
import type { MediaItem } from "../services/movies.service";

defineProps<{
  movie: MediaItem;
}>();
</script>

<template>
  <article class="group min-w-0 overflow-hidden rounded-lg bg-zinc-900">
    <div class="aspect-[2/3] overflow-hidden bg-zinc-800">
      <img
        v-if="movie.poster_path"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="`Affiche de ${movie.title}`"
        loading="lazy"
      />
      <div
        v-else
        class="flex h-full items-center justify-center px-4 text-center text-sm text-zinc-500"
      >
        Affiche indisponible
      </div>
    </div>

    <div class="space-y-2 p-3">
      <div class="flex items-start justify-between gap-2">
        <h3 class="line-clamp-2 font-semibold leading-tight text-white">
          {{ movie.title }}
        </h3>
        <span class="shrink-0 rounded bg-[#e50914]/15 px-1.5 py-0.5 text-xs text-red-300">
          {{ movie.type === "tv" ? "Série" : "Film" }}
        </span>
      </div>

      <p class="text-sm text-zinc-400">
        ★ {{ movie.vote_average.toFixed(1) }}/10
      </p>

      <p v-if="movie.overview" class="line-clamp-3 text-sm leading-5 text-zinc-500">
        {{ movie.overview }}
      </p>
    </div>
  </article>
</template>
