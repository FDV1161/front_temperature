<template>
  <dir>
      <v-data-table
    :items-per-page="defaultItemsPerPage"
    :loading="loading"
    :options.sync="options"
    :items="items"
    :server-items-length="itemsPerPage"
    v-bind="$attrs"
  >
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </v-data-table>
  
  </dir>
  
</template>

<script>
export default {
  props: {
    loadFunction: { required: true },    
    defaultSortBy: {default: null},
    defaultSortDesc: {default: null},
    defaultPage: {default: 1},
    defaultItemsPerPage: {default: 5},
  },

  data: () => ({
    options: {},
    loading: false,
    items: [],
    itemsPerPage: 0
  }),

  async mounted () {
    await this.loadData(this.defaultSortBy, this.defaultSortDesc, this.defaultPage, this.defaultItemsPerPage);
  },

  

  watch: {
    options: {
      async handler() {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;
        await this.loadData(sortBy, sortDesc, page, itemsPerPage);
      },
      deep: true,
    },
  },

  methods: {
    async loadData(sortBy, sortDesc, page, itemsPerPage){
      this.loading = true;
      [this.items, this.itemsPerPage] = await this.loadFunction(sortBy, sortDesc, page, itemsPerPage);      
      this.loading = false;
    }
  }
};
</script>
