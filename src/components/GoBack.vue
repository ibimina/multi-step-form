<script setup>
import { useRouter } from "vue-router";
const route = useRouter();
const handleGoBack = () => {
  route.back();
};
</script>

<template>
  <button @click="handleGoBack">GoBck</button>
</template>
