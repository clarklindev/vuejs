<template>
  <base-card>
    <h2>find your coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        id="frontend"
        v-model="filters.frontend"
        @change="setFilter"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="backend"
        v-model="filters.backend"
        @change="setFilter"
      />
      <label for="backend">backend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="career"
        v-model="filters.career"
        @change="setFilter"
      />
      <label for="career">career</label>
    </span>
  </base-card>
</template>
<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter() {
      console.log(`this.filters: ` + JSON.stringify(this.filters, null, 2));

      this.$emit('change-filter', { ...this.filters });
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
