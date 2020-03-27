<template>
  <div class="w-100 d-flex flex-row justify-content-between">
    <div>
      <md-button
        class="md-icon-button menu"
        @click="toggleMenu"
      >
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">{{ getPageName }}</span>
    </div>

    <md-button class="md-icon-button" @click="signOut">
      <md-icon>exit_to_app</md-icon>
    </md-button>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Toolbar',
  computed: {
    getPageName() {
      return this.$route.name;
    },
    ...mapGetters({ user: 'getUserDetails' }),
  },
  methods: {
    ...mapActions({ fetchUser: 'fetchUser' }),
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
};
</script>

<style lang="scss" scoped>
.md-title {
  line-height: 45px;
}

.menu {
  display: none;
}

@media (max-width: 600px) {
  .menu {
    display: inline-block;
  }
}
</style>
