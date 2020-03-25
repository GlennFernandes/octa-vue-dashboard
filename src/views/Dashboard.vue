<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar>
        <toolbar v-bind:menuVisible="menuVisible" @toggleMenu="toggleMenu"></toolbar>
      </md-app-toolbar>

      <md-app-drawer
        md-swipeable
        :md-active.sync="menuVisible"
        md-persistent="mini"
      >
        <sidebar v-bind:menuVisible="menuVisible" @toggleMenu="toggleMenu"></sidebar>
      </md-app-drawer>

      <md-app-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Error quibusdam, non molestias et! Earum magnam,
        similique, quo recusandae placeat dicta asperiores modi
        sint ea.
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import firebase from 'firebase';
// import Logo from '@/components/Logo.vue';
import Sidebar from '@/components/Sidebar.vue';
import Toolbar from '@/components/Toolbar.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: 'getUserDetails',
    }),
  },
  data: () => {
    return { menuVisible: true };
  },
  methods: {
    ...mapActions({ fetchUser: 'fetchUser' }),
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
  components: { Sidebar, Toolbar },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/settings.scss';

.page-container {
  height: 100%;
  width: 100%;
}
</style>
