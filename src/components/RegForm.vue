<template>
  <main>
    <section>
      <slot name="thankyou"></slot>
      <slot name="header"></slot>
      <slot name="body"></slot>
    </section>
    <aside>
      <slot name="footer"></slot>
    </aside>
  </main>
</template>

<style scoped>
section {
  background-color: hsl(0, 0%, 100%);
  max-width: 440px;
  width: 90%;
  padding: 2em 1em;
  border-radius: 8px;
  position: relative;
  top: -5.2em;
  margin: auto;
  margin-bottom: 2em;
  box-shadow: 0px 3px 0px 0px rgba(221, 221, 221, 0.5);
}
aside {
  background-color: hsl(0, 0%, 100%);
  padding: 1em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
@media (min-width: 40rem) {
  main {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  section {
    top: auto;
    margin: 0 auto;
    padding: 2em 0;
    box-shadow: none;
  }
  aside {
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    margin: 0 auto 1em;
    padding: 0;
    max-width: 440px;
    width: 100%;
  }
}
</style>
