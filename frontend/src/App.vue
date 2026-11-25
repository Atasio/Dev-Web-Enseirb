<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import SearchBar from "./components/SearchBar.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[#0b0b10] text-zinc-100">
    <header
      class="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4 sm:px-8 lg:px-16"
    >
      <RouterLink
        class="text-2xl font-extrabold tracking-tight text-[#e50914]"
        to="/"
      >
        SeenFlix
      </RouterLink>

      <div class="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-4">
        <SearchBar class="order-2 w-full sm:order-none sm:w-auto" />

        <nav
          class="flex items-center gap-4 text-sm font-medium text-zinc-400 sm:text-base"
          aria-label="Navigation principale"
        >
          <RouterLink class="transition hover:text-white" to="/favorites">
            Favoris
          </RouterLink>
          <RouterLink class="transition hover:text-white" to="/login">
            Connexion
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 px-5 py-8 sm:px-8 lg:px-16">
      <RouterView />
    </main>

    <footer class="border-t border-zinc-800 px-5 py-6 text-center text-sm text-zinc-600">
      Projet web SeenFlix
    </footer>
  </div>
</template>
