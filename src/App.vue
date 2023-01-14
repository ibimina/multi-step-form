<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">1</RouterLink>
      <RouterLink to="/plan">2</RouterLink>
      <RouterLink to="/add-ons">3</RouterLink>
      <RouterLink to="/summary">4</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
