<script setup>
import path from "../path";
const { steps } = path();
</script>

<template>
  <header>
    <nav>
      <div v-for="step in steps" :key="step.step" class="navlink">
        <span class="step_no" :class="{ active: step.isPath }">{{
          step.no
        }}</span>
        <p class="step_title">
          <span class="step">{{ step.step }}</span>
          <span class="step_name">{{ step.name }}</span>
        </p>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-image: url("/images/bg-sidebar-mobile.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 12em;
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
  background-color: transparent;
  border: 0;
}
.step_no.active {
  background-color: hsl(206, 94%, 87%);
  color: hsl(213, 96%, 18%);
  border: 0;
}
.step_no {
  border: 1px solid hsl(0, 0%, 100%);
  width: 28px;
  height: 28px;
  padding: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
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
    background-image: url("/images/bg-sidebar-desktop.svg");
    height: auto;
    width: auto;
    padding: 2em 1.5em;
    border-radius: 8px;
    text-align: left;
  }
  nav {
    width: max-content;
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
