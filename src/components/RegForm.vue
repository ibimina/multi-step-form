<template>
  <main>
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  padding: 2em 1em;
}
</style>
