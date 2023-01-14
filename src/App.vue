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
        <p class="step_title">
          <span class="step">{{ step.step }}</span>
          <span class="step_name">{{ step.name }}</span>
        </p>
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
  color: hsl(0, 0%, 100%);
}
.navlink.router-link-active .step_no {
  background-color: hsl(206, 94%, 87%);
  color: hsl(213, 96%, 18%);
  border: 0;
}
.step_no {
  border: 1px solid hsl(0, 0%, 100%);
  padding: 0.2em 0.8em;
  border-radius: 50%;
  font-weight: 500;
}
.step_title {
  display: none;
}
.step {
  font-size: 0.7em;
  line-height: 10px;
  color: hsl(229, 24%, 87%);
  text-transform: uppercase;
  font-weight: 500;
}
.step_name {
  text-transform: uppercase;
  font-weight: 500;
}
@media (min-width: 60rem) {
  header {
    background-image: url("./assets/images/bg-sidebar-desktop.svg");
    height: auto;
    width: auto;
    padding: 2em 1.5em;
    border-radius: 8px;
    text-align: left;
  }
  nav {
    padding-top: 0;
    flex-direction: column;
    align-items: start;
    gap: 0;
  }
  .navlink {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin-bottom: 1em;
  }
  .step_title {
    display: flex;
    flex-direction: column;
  }
}
</style>
