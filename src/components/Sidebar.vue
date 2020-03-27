<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">
      <div class="md-toolbar-section-start">
        <div class="logo_wrapper"><Logo /></div>
      </div>
      <div class="md-toolbar-section-end" v-if="isMobile">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
        >
          <md-icon>chevron_left</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-list>
      <router-link to="/dashboard">
        <md-list-item>
          <md-icon>dashboard</md-icon>
          <span class="md-list-item-text">Dashboard</span>
        </md-list-item>
      </router-link>

      <router-link to="/categories">
        <md-list-item>
          <md-icon>category</md-icon>
          <span class="md-list-item-text">Categories</span>
        </md-list-item>
      </router-link>

      <router-link to="/technologies">
        <md-list-item>
          <md-icon>settings_ethernet</md-icon>
          <span class="md-list-item-text">Technologies</span>
        </md-list-item>
      </router-link>

      <router-link to="/clients">
        <md-list-item>
          <md-icon>people</md-icon>
          <span class="md-list-item-text">Clients</span>
        </md-list-item>
      </router-link>

      <router-link to="/projects">
        <md-list-item>
          <md-icon>important_devices</md-icon>
          <span class="md-list-item-text">Projects</span>
        </md-list-item>
      </router-link>

      <router-link to="/portfolios">
        <md-list-item>
          <md-icon>folder_shared</md-icon>
          <span class="md-list-item-text">Portfolios</span>
        </md-list-item>
      </router-link>
    </md-list>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'Sidebar',
  props: ['isMobile'],
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu');
    },
  },
  components: { Logo },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/settings.scss';

.router-link-active {
  & li {
    color: white;
    background-color: $accent;
    border-radius: 6px;
  }

  & span.md-list-item-text {
    color: white !important;
    font-weight: 600;
  }
}

.logo_wrapper {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
}

.md-list-item {
  margin: 10px 20px;
}

.md-drawer.md-persistent-mini:not(.md-active) .md-list-item {
  margin: 0px;
}

.md-list-item-content > .md-icon:first-child {
  margin-right: 16px;
}
</style>
