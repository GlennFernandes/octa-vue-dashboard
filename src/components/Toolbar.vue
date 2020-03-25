<template>
  <div class="w-100 d-flex flex-row justify-content-between">
    <md-button
      class="md-icon-button"
      @click="toggleMenu"
      v-if="!menuVisible"
    >
      <md-icon>menu</md-icon>
    </md-button>
    <span class="md-title">{{
      getPageName
    }}</span>
    <md-button class="md-icon-button" @click="signOut">
      <md-icon>exit_to_app</md-icon>
    </md-button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: "Toolbar",
    props : ['menuVisible'],
    computed: {
    getPageName() {
      return this.$route.name;
    },
  },
    methods: {
      toggleMenu() {
        this.$emit('toggleMenu');
      },
      signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.fetchUser(null);
          this.$router.replace({ name: 'Login' });
        });
    },
    },
}
</script>

<style lang="scss" scoped>
.md-title{
  line-height: 45px;
}
</style>