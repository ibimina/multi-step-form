<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="navlink">1</RouterLink>
      <RouterLink to="/plan" class="navlink">2</RouterLink>
      <RouterLink to="/add-ons" class="navlink">3</RouterLink>
      <RouterLink to="/summary" class="navlink">4</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
