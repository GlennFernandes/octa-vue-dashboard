<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <span>{{ user.data.email }}</span>
    <md-button
      v-on:click="signOut"
      class="md-raised md-primary login__btn"
      >Logout</md-button
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import firebase from 'firebase';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: 'getUserDetails',
    }),
  },
  
  methods: {
    ...mapActions({ fetchUser: 'fetchUser', }),
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
  components: {},
};
</script>
