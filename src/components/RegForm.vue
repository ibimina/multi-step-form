<template>
  <main>
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </main>
</template>

<style scoped>
main {
  max-width: 350px;
  width: 100%;
  padding: 2em 1em;
  border-radius: 8px;
  position: relative;
  top: -5.2em;
  margin: auto;
  background-color: hsl(0, 0%, 100%);
}
</style>
