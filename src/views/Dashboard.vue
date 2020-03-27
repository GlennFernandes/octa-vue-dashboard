<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar>
        <toolbar
          v-bind:menuVisible="menuVisible"
          @toggleMenu="toggleMenu"
        ></toolbar>
      </md-app-toolbar>

      <md-app-drawer
        md-permanent="full"
        :md-active.sync="menuVisible"
        md-swipeable
      >
        <sidebar
          v-bind:isMobile="isMobile"
          @toggleMenu="toggleMenu"
        ></sidebar>
      </md-app-drawer>

      <md-app-content> </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'Dashboard',
  data: () => {
    return {
      menuVisible: window.innerWidth > 600,
      isMobile: window.innerWidth < 600,
    };
  },
  methods: {
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
