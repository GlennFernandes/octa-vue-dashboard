<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~vue-material/dist/theme/engine'; // Import the theme engine
@import './assets/css/settings.scss';
@include md-register-theme(
  'default',
  (
    primary: $primary,
    accent: $accent,
    theme: dark
  )
);

@import '~vue-material/dist/theme/all';

#app {
  width: 100vw;
  height: 100vh;
}
</style>
