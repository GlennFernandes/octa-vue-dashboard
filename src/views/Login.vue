<template>
  <div
    class="md-layout md-alignment-center-center login__wrapper"
  >
    <md-card
      md-with-hover
      class="md-layout-item md-xsmall-size-90 md-small-size-60 md-medium-size-30"
    >
      <md-card-content>
        <div class="md-layout md-alignment-center-center">
          <div
            class="md-layout-item md-xsmall-size-30 md-small-size-20 md-medium-size-30"
          >
            <Logo />
          </div>
        </div>
        <form
          novalidate
          class="md-layout"
          @submit.prevent="validateUser"
        >
          <md-field :class="getValidationClass('username')">
            <label>Username</label>
            <md-input v-model="form.username"></md-input>
            <span
              class="md-error"
              v-if="!$v.form.username.required"
              >The Username is required</span
            >
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label>Password</label>
            <md-input
              v-model="form.password"
              type="password"
            ></md-input>
            <span
              class="md-error"
              v-if="!$v.form.password.required"
              >The Password is required</span
            >
          </md-field>
          <md-button
            type="submit"
            class="md-raised md-accent login__btn"
            >Login</md-button
          >
        </form>
        {{ user }}
        <md-progress-bar
          md-mode="indeterminate"
          v-if="validating"
        />
      </md-card-content>
    </md-card>
    <md-snackbar
      md-position="center"
      :md-active.sync="snackbar.display"
    >
      <span>{{ snackbar.message }}</span>
    </md-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
// @ is an alias to /src
import Logo from '@/components/Logo.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  mixins: [validationMixin],
  data: () => ({
    form: {
      username: null,
      password: null,
    },
    validating: false,
    user: null,
    snackbar: {
      message: '',
      display: false,
    },
  }),
  validations: {
    form: {
      username: { required },
      password: { required },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return { 'md-invalid': field.$invalid && field.$dirty };
      }
      return false;
    },
    clearForm() {
      this.$v.$reset();
      this.form.username = null;
      this.form.password = null;
    },
    showSnackbar(message) {
      this.snackbar.display = true;
      this.snackbar.message = message;
    },
    ...mapActions({ fetchUser: 'fetchUser', }),
    loginUser() {
      this.validating = true;
      this.showSnackbar('Logging you in. Please wait!');
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.form.username,
          this.form.password,
        )
        .then((data) => {
          this.fetchUser(data.user);
          this.showSnackbar(
            'Succesfuly logged in! You are being redirected',
          );
          this.validating = false;
          this.clearForm();
          this.$router.replace({ name: 'Dashboard' });
        })
        .catch((err) => {
          this.validating = false;
          this.showSnackbar(err.message);
        });
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loginUser();
      }
    },
  },
  components: { Logo },
};
</script>

<style lang="scss">
.login {
  &__wrapper {
    padding-top: 15vh;
  }

  &__btn {
    width: 100%;
  }
}

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
