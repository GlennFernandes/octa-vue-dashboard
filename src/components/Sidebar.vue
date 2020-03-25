<template>
  <div>
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
        <span class="md-list-item-text">{{this.menuVisible}}</span>
      </md-list-item>

      <md-list-item>
        <md-icon>error</md-icon>
        <span class="md-list-item-text">Spam</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'Sidebar',
    props: ['menuVisible'],
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
  width: 3rem;
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
