<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
const steps = ref([
  { no: 1, step: "STEP 1", name: "Your Info", to: "" },
  { no: 2, step: "STEP 2", name: "Select Plan", to: "plan" },
  { no: 3, step: "STEP 3", name: "Add-ons", to: "add-ons" },
  { no: 4, step: "STEP 4", name: "Summary", to: "summary" },
]);
</script>

<template>
  <header>
    <nav>
      <RouterLink
        v-for="step in steps"
        :key="step.step"
        :to="`/${step.to}`"
        class="navlink"
      >
        <span class="step_no">{{ step.no }}</span>
        <div class="step_title">
          <span class="step">{{ step.step }}</span>
          <span class="step_name">{{ step.name }}</span>
        </div>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-image: url("./assets/images/bg-sidebar-mobile.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 10em;
  text-align: center;
}
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  color: hsl(0, 0%, 100%);
  padding-top: 2em;
}
.navlink {
  border: 2px solid hsl(0, 0%, 100%);
  color: hsl(0, 0%, 100%);
  padding: 0.2em 0.8em;
  border-radius: 50%;
}
.navlink.router-link-active {
  background-color: hsl(206, 94%, 87%);
  color: hsl(213, 96%, 18%);
  border: 0;
}
.step_title {
  display: none;
}
@media (min-width: 60rem) {
  header {
    background-image: url("./assets/images/bg-sidebar-desktop.svg");
  }
  .step_title {
    display: block;
  }
}
</style>
