<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~vue-material/dist/theme/engine'; // Import the theme engine

@include md-register-theme(
  'default',
  (
    primary: #34CCB2,
    accent: #F961A7,
    theme: dark
  )
);

@import '~vue-material/dist/theme/all';

#app {
  width: 100vw;
  height: 100vh;
}
</style>
