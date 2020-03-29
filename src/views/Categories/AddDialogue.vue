<template>
  <md-dialog
    :md-active="showDialog"
    @md-clicked-outside="closeDialog"
  >
    <form
      novalidate
      class="h-100 d-flex flex-column justify-content-between pt-2 pb-1 px-2"
      @submit.prevent="validateUser"
    >
      <md-dialog-title>Add Category</md-dialog-title>

      <div class="form-body">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('name')">
              <label for="name">First Name</label>
              <md-input
                name="name"
                id="name"
                v-model="form.name"
                :disabled="sending"
              />
              <span
                class="md-error"
                v-if="!$v.form.name.required"
                >The first name is required</span
              >
            </md-field>
          </div>
        </div>

        <md-snackbar :md-active.sync="entitySaved"
          >The {{ label.singular }} "{{ lastEntity }}" was saved
          successfully</md-snackbar
        >
        <md-progress-bar
          md-mode="indeterminate"
          v-if="sending"
        />
      </div>

      <div class="w-100 d-flex justify-content-between">
        <div class="d-flex flex-column justify-content-center">
          <md-checkbox v-model="addAnother" class="md-primary">
            Add Another
          </md-checkbox>
        </div>

        <div>
          <md-button class="md-primary" @click="closeDialog"
            >Close</md-button
          >
          <md-button
            type="submit"
            class="md-accent md-raised accent-button"
            :disabled="sending"
            >Create Category</md-button
          >
        </div>
      </div>
    </form>
  </md-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

import Axios from '../../services/request';

export default {
  name: 'AddDialogue',
  mixins: [validationMixin],
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    label: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    form: { name: null },
    addAnother: true,
    entitySaved: false,
    sending: false,
    lastEntity: null,
  }),
  validations: { form: { name: { required } } },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return { 'md-invalid': field.$invalid && field.$dirty };
      }
      return false;
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
    },
    saveUser() {
      const requestBody = { name: this.form.name };
      this.sending = true;
      this.lastEntity = this.form.name;
      Axios()
        .post('category', requestBody)
        .then(({ data }) => {
          const { payload } = data;
          if (payload.id) {
            this.entitySaved = true;
            this.sending = false;
            this.clearForm();
            if(!this.addAnother){
                this.closeDialog();
            }
          }
        });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>
