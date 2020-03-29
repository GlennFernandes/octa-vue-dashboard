<template>
  <div>
    <md-table
      v-model="searched"
      md-sort="name"
      md-sort-order="asc"
      md-card
      @md-selected="onSelect"
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <md-button
            class="md-dense md-raised md-primary"
            @click="showAddDialog = true"
            ><md-icon>add</md-icon>Add
            {{ label.singular }}</md-button
          >
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search by name..."
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>
      <md-table-toolbar
        slot="md-table-alternate-header"
        slot-scope="{ count }"
      >
        <div class="md-toolbar-section-start">
          {{ getAlternateLabel(count) }}
        </div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-empty-state
        v-if="!isFetching"
        md-icon="sentiment_dissatisfied"
        :md-label="`No ${label.plural} found`"
        :md-description="
          `No ${label.plural} found for this '${search}' query. Try a different search term or create a new ${label.singular}.`
        "
      >
        <md-button
          class="md-primary md-raised"
          @click="showAddDialog = true"
          >Create New {{ label.singular }}</md-button
        >
      </md-table-empty-state>

      <md-table-empty-state
        v-if="isFetching"
        md-icon="cloud_download"
        :md-label="`Fetching ${label.plural}`"
        :md-description="
          `Please wait while we fetch the ${label.plural}. Heres a joke while you wait. `
        "
      >
        <p>{{ fetchingJoke }}</p>
      </md-table-empty-state>

      <md-table-row
        :md-index="item.id"
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        class="clickable"
        @click="onRowClick(item)"
      >
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell
          md-label="Created At"
          md-sort-by="createdAt"
          >{{ item.createdAt | moment }}</md-table-cell
        >
        <md-table-cell
          md-label="Updated At"
          md-sort-by="updatedAt"
          >{{ item.updatedAt | moment }}</md-table-cell
        >
      </md-table-row>
    </md-table>
    <AddDialogue
      :label="label"
      :show-dialog="showAddDialog"
      @closeDialog="closeAddDialog"
    />
  </div>
</template>

<script>
import moment from 'moment';
import AddDialogue from './AddDialogue.vue';
import Axios from '../../services/request';
import joke from '../../services/jokes';

const toLower = (text) => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) =>
      toLower(item.name).includes(toLower(term)),
    );
  }

  return items;
};

export default {
  name: 'CategoriesView',
  components: { AddDialogue },

  data: () => ({
    label: { singular: 'Category', plural: 'Categories' },
    showAddDialog: false,
    isFetching: true,
    fetchingJoke: joke(),
    search: null,
    searched: [],
    selected: [],
    users: [
      {
        id: 20,
        name: 'Maura Thoms',
        email: 'mthomsj@webeden.co.uk',
        gender: 'Male',
        title: 'Actuary',
      },
    ],
  }),

  methods: {
    closeAddDialog() {
      this.showAddDialog = false;
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    onSelect(items) {
      this.selected = items;
    },
    onRowClick(item) {
      const objIndex = this.searched.findIndex(
        (obj) => obj.id === item.id,
      );
      this.searched[objIndex].name = 'Laila';
    },
    getAlternateLabel(count) {
      const label =
        count > 1 ? this.label.plural : this.label.singular;
      return `${count} ${label} selected`;
    },
    fetchEntities() {
      Axios()
        .get('category')
        .then(({ data }) => {
          const { payload } = data;
          this.isFetching = false;
          this.users = payload;
          this.searched = this.users;
        });
    },
  },
  created() {
    this.fetchEntities();
  },
  filters: {
    moment(date) {
      return moment(date).format('Do MMMM, YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
