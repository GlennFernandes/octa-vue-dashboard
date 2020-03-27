<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar>
        <toolbar></toolbar>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <sidebar></sidebar>
      </md-app-drawer>

      <md-app-content>
        Categories
      </md-app-content>
    </md-app>
  </div>
</template>

<script>

import Sidebar from '@/components/Sidebar.vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'Categories',
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
