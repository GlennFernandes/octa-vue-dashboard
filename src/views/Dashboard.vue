<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar>
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title" style="flex: 1">{{
          getPageName
        }}</span>
        <md-button class="md-icon-button" @click="signOut">
          <md-icon>exit_to_app</md-icon>
        </md-button>
      </md-app-toolbar>

      <md-app-drawer
        md-swipeable
        :md-active.sync="menuVisible"
        md-persistent="mini"
      >
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-start">
            <div class="logo_wrapper"><Logo /></div>
          </div>
          <div class="md-toolbar-section-end">
            <md-button
              class="md-icon-button md-dense"
              @click="toggleMenu"
            >
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <router-link to="/">
            <md-list-item>
              <md-icon>dashboard</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
          </router-link>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
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
import firebase from 'firebase';
import Logo from '@/components/Logo.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: 'getUserDetails',
    }),
    getPageName() {
      console.log("getPageName -> this.$material.theming", this.$theme );
      console.log('getPageName -> this.$route', this.$route);
      return this.$route.name;
    },
  },
  data: () => {
    return { menuVisible: true };
  },
  methods: {
    ...mapActions({ fetchUser: 'fetchUser' }),
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
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
  components: { Logo },
};
</script>

<style lang="scss" scoped>


.page-container {
  height: 100%;
  width: 100%;
}

.logo_wrapper {
  width: 3rem;
}

.md-app {
  min-height: 100%;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 300px;
}

.router-link-active {
  & li {
    color: white;
    background-color: #34CCB2;
  }

  & span.md-list-item-text {
    color: white !important;
    font-weight: 700;
    font-size: 1.1rem;
  }
}
</style>
